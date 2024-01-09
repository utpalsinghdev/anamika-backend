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
      },
      include: {
        AdharCard: true,
        panCard: true,
        agent: true,
        photo: true

      }
    })
    // const res = await this.mail.sendSms({
    //   numbers: _customer.phone,
    //   type: mailEnums.LOAN_APPROVED.toString(),
    //   value: `${_customer.name}|${_customer.loanInNumber}`
    // })

    // console.log(originalPdfPath, encryptedPdfPath, password, pdfName)
    const n_approval = await this.prisma.approvalLetter.create({
      data: {
        ...createApprovalLetterDto,
      },
      include: {
        customer: {
          include: {
            agent: true
          }
        }
      }
    });

    if (n_approval) {
      // const { originalPdfPath, encryptedPdfPath, password, pdfName } = await this.pdfLink();
      function calculateEMI(principal: number, interestRate: number, years: number) {
        if (principal && interestRate && years) {
          interestRate = interestRate / 100;
          const totalMonths = years * 12;
          const totalInterest = principal * interestRate * years;
          const totalLoanAmount = principal + totalInterest;
          const emi = totalLoanAmount / totalMonths;
          return {
            emi: Math.round(emi),
            totalLoanAmount: totalLoanAmount,
            totalMonths,
          };
        } else {
          return null;
        }
      }
      const _loanAmount = _customer.loanInNumber;
      const costWithoutGst =
        (_loanAmount > 100000 && _loanAmount < 300000) ||
          _loanAmount == 100000 ||
          _loanAmount === 300000
          ? 10000
          : _loanAmount * 0.03;
      const gst = costWithoutGst * 0.18;
      const totalCost = costWithoutGst + gst;
      const dynamicData = {
        company: 'Mahadev Financial Services Pvt. Ltd.',
        name: _customer.name,
        mob: _customer.phone,
        photoUrl: createApprovalLetterDto.photo ? createApprovalLetterDto.photo : _customer.photo.url,
        cfn: `${_customer.customerId} | Application No. ${_customer.loanId}`,
        date: new Date().toLocaleDateString(),
        cfnId: _customer.customerId,
        doa: _customer.createdAt.toLocaleDateString(),
        guardian_name: _customer.guardian_name,
        address: _customer.address,
        email: _customer.email,
        aadhar: _customer.adharNumber,
        pan: _customer.panNumber,
        loan_amount: `${_customer.loanInNumber} /- (${_customer.loanInWords})`,
        loan_details: _customer.loanInNumber ? `Periods ${_customer.loanYear} Years at Intrest Rate-5% EMI RS. ${calculateEMI(
          _customer?.loanInNumber,
          5,
          _customer?.loanYear
        ).emi
          }/Month` : 'NA'
        ,
        bank_detailis: `${_customer.bank} / ${_customer.AccountNumber} / ${_customer.ifsc} / ${_customer.accountType}`,
        agent_details: _customer.agent ? `${_customer.agent.employeeCode}-${_customer.agent.firstName} ${_customer.agent.LastName} / ${_customer.agent.phone}` : 'NA',
        processing_fee: `Rs. ${costWithoutGst} + Rs. ${gst} = Rs. ${totalCost}`,


      }

      const { originalPdfPath, encryptedPdfPath, password, pdfName } = await this.pdfLink(dynamicData)

      console.log(password)
      await this.prisma.approvalLetter.update({
        where: {
          id: n_approval.id
        },
        data: {
          pdfPassword: password.toLocaleString(),
          url: encryptedPdfPath,
        }
      })
    }

    return n_approval;
  }

  async findAll() {
    const all_approvals = await this.prisma.approvalLetter.findMany({
      include: {
        customer: {
          include: {
            agent: true,
            photo: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return all_approvals.map((approval) => {
      return {
        ...approval,
        url: approval.url ? "/uploads" + approval.url.split("/uploads")[1] : null
      }
    })
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

  private async pdfLink(dynamicData: any) {

    const htmlPath = path.resolve('uploads', "template", "approval.html")

    const pdfName = `${dynamicData.name}-${dynamicData.cfnId}.pdf` //TODO: change name with customer name

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
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

      const page = await browser.newPage();
      await page.setContent(populatedHtml);
      await page.pdf({ path: outputPath });

      await browser.close();
    })();


    // add two min pause here

    setTimeout(() => {
      execSync(`qpdf --encrypt ${password} ${password} 256 -- --allow-weak-crypto "${originalPdfPath}" "${encryptedPdfPath}"`);
      fs.unlinkSync(originalPdfPath);
    }
      , 2000);



    return {
      originalPdfPath,
      encryptedPdfPath,
      password,
      pdfName
    }
  }
}
