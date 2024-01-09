import { Injectable } from '@nestjs/common';
import { CreateApprovalLetterDto } from './dto/create-approval-letter.dto';
import { UpdateApprovalLetterDto } from './dto/update-approval-letter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MailService } from 'src/mail/mail.service';
import mailEnums from 'src/utils/mailEnumbs';
import { exec, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import puppeteer from 'puppeteer';
@Injectable()
export class ApprovalLetterService {
  constructor(private readonly prisma: PrismaService, private readonly cloud: CloudinaryService, private readonly mail: MailService) { }
  async create(createApprovalLetterDto: CreateApprovalLetterDto) {
    if (createApprovalLetterDto.photo) {
      const img = await this.cloud.uploadBase64File(createApprovalLetterDto.photo);
      createApprovalLetterDto.photo = img.secure_url
    }
    const _customer = await this.prisma.customer.findUnique({
      where: {
        id: createApprovalLetterDto.customerId
      }
    })
    const res = await this.mail.sendSms({
      numbers: _customer.phone,
      type: mailEnums.LOAN_APPROVED.toString(),
      value: `${_customer.name}|${_customer.loanInNumber}`
    })
    const { originalPdfPath, encryptedPdfPath, password, pdfName } = await this.pdfLink();
    // console.log(originalPdfPath, encryptedPdfPath, password, pdfName)
    return await this.prisma.approvalLetter.create({
      data: {
        ...createApprovalLetterDto,
        pdfPassword: password.toLocaleString(),
        url: encryptedPdfPath,
      },
      include: {
        customer: {
          include: {
            agent: true
          }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.approvalLetter.findMany({
      include: {
        customer: {
          include: {
            agent: true,
            photo: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} approvalLetter`;
  }

  async update(id: number, updateApprovalLetterDto: UpdateApprovalLetterDto) {
    return `This action updates a #${id} approvalLetter`;
  }

  async remove(id: number) {
    return await this.prisma.approvalLetter.delete({ where: { id } });
  }

  private async pdfLink() {
    const dynamicData = {
      name: "Utpal Singh",
    };

    const htmlPath = path.resolve('uploads', "template", "approval.html")

    const pdfName = `approval-${Date.now()}.pdf` //TODO: change name with customer name

    const outputPath = path.resolve('uploads', "original", pdfName)

    const originalPdfPath = path.resolve('uploads', "original", pdfName)

    const encryptedPdfPath = path.resolve('uploads', "protected", pdfName)

    const password = Math.floor(100000 + Math.random() * 900000);

    const populateTemplate = (template: any, data: any) => {
      return template.replace(/{{(\w+)}}/g, (match: any, key: any) => {
        return data[key] !== undefined ? data[key] : match;
      });
    };

    const html = fs.readFileSync(htmlPath, "utf8");
    const populatedHtml = populateTemplate(html, dynamicData);

    (async () => {
      const browser = await puppeteer.launch(
        {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: false,
        }
      );
      const page = await browser.newPage();
      await page.setContent(populatedHtml);
      await page.pdf({ path: outputPath });

      await browser.close();
    })();


    console.log(originalPdfPath)
    // add two min pause here

    execSync(`sudo qpdf --encrypt ${password} ${password} 128 -- "${originalPdfPath}" "${encryptedPdfPath}"`);



    return {
      originalPdfPath,
      encryptedPdfPath,
      password,
      pdfName
    }
  }
}
