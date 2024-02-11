import { Injectable } from '@nestjs/common';
import { CreateWelcomeLetterDto } from './dto/create-welcome-letter.dto';
import { UpdateWelcomeLetterDto } from './dto/update-welcome-letter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateWelomeCustomerDto } from './dto/welcome-manual.dto';
import { MailService } from 'src/mail/mail.service';
import mailEnums from 'src/utils/mailEnumbs';

@Injectable()
export class WelcomeLetterService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService) { }
  async create(createWelcomeLetterDto: CreateWelcomeLetterDto) {
    const _customer = await this.prisma.customer.findFirst({
      where: {
        id: createWelcomeLetterDto.customerId
      }
    })
    await this.mail.sendSms({
      numbers: _customer.phone,
      type: mailEnums.WELCOME.toString(),
      value: `${_customer.name}|${_customer.customerId}|${_customer.phone}`
    })
    return await this.prisma.welcomeLetter.create({
      data: createWelcomeLetterDto,
      include: {
        for: true,
        with: true
      }
    });
  }
  async createManual(body: CreateWelomeCustomerDto) {
    const l_id = await this._loanId();
    const c_id = await this._customerId();
    console.log("l", l_id)
    console.log("c", c_id)
    const generatePassword = (length: number) => Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('');
    const password = generatePassword(6);
    console.log(password)
    const n_customer = await this.prisma.customer.create({
      data: {
        name: body.name,
        phone: body.phone,
        guardian_relation: body.guardian_relation,
        guardian_name: body.guardian_name,
        loanInNumber: body.loanInNumber,
        loanInWords: body.loanInWords,
        agent: { connect: { id: body.employeeId } },
        loanYear: body.loanYear,
        loanId: l_id,
        status: "APPROVED",
        customerId: c_id,
        password: await hash(body.phone, 10),
      }
    });
    await this.mail.sendSms({
      numbers: body.phone,
      type: mailEnums.WELCOME.toString(),
      value: `${body.name}|${c_id}|${body.phone}`
    })
    return await this.create({
      customerId: n_customer.id,
      employeeId: body.employeeId,
      charge: body.charge,
    })
  }
  async findAll() {
    return await this.prisma.welcomeLetter.findMany({
      include: {
        for: true,
        with: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.welcomeLetter.findFirst({
      where: { id }, include: {
        for: true,
        with: true
      }
    });
  }

  async update(id: number, updateWelcomeLetterDto: UpdateWelcomeLetterDto) {
    return await this.prisma.welcomeLetter.update({
      where: { id },
      data: updateWelcomeLetterDto,
      include: {
        for: true,
        with: true
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.welcomeLetter.delete({ where: { id } });
  }
  private async _loanId() {
    const applicationId = await this.prisma.customer.findMany({
      take: 1,
      orderBy: {
        id: 'desc'
      },
    })
    const last_application = applicationId[0]
    let a_id = "CBGSAID"
    if (!last_application?.loanId) {
      a_id = a_id + "0001"

      return a_id
    } else {
      const last_id = last_application.loanId
      const _id = last_id.split("CBGSAID")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')

      return a_id
    }


  }
  private async _customerId() {
    const applicationId = await this.prisma.customer.findMany({
      take: 1,
      orderBy: {
        id: 'desc'
      },
      where: {
        status: Status.APPROVED
      }
    })
    const last_application = applicationId[0]
    let a_id = "CFN"
    if (!last_application?.customerId) {
      a_id = a_id + "0001"

      return a_id
    } else {
      const last_id = last_application.customerId
      const _id = last_id.split("CFN")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')

      return a_id
    }


  }
}
