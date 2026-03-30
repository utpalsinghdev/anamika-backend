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
    try {
      console.log("Starting customer creation process...");
      const l_id = await this._loanId();
      const c_id = await this._customerId();
      console.log("Generated loan ID:", l_id);
      console.log("Generated customer ID:", c_id);
      const generatePassword = (length: number) => Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('');
      const password = generatePassword(6);
      console.log("Generated password:", password);
      
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
    } catch (error) {
      console.error('Error creating manual customer:', error);
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }
  async findAll() {
    return await this.prisma.welcomeLetter.findMany({
      include: {
        for: true,
        with: true
      },
      orderBy: {
        createdAt: "desc"
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
    let uniqueCode = '';
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 50; // Increased attempts for random generation
    
    while (!isUnique && attempts < maxAttempts) {
      // Try sequential approach first
      if (attempts < 10) {
        const applicationId = await this.prisma.customer.findMany({
          take: 1,
          orderBy: {
            id: 'desc'
          },
        })
        const last_application = applicationId[0]
        let a_id = "ACID"
        
        if (!last_application?.loanId) {
          a_id = a_id + "0001"
        } else {
          const last_id = last_application.loanId
          // Handle both SFAID and EFAID prefixes
          if (last_id.startsWith("ACID")) {
            const _id = last_id.split("ACID")[1]
            const id = parseInt(_id) + 1
            a_id = a_id + id.toString().padStart(4, '0')
          } else {
            // If last ID is not SFAID format, start from 0001
            a_id = a_id + "0001"
          }
        }
        uniqueCode = a_id;
      } else {
        // Fall back to random generation like customer service
        const randomPin = Math.floor(10000 + Math.random() * 90000).toString();
        uniqueCode = `ACID${randomPin}`;
      }

      // Check if this loan ID already exists
      const existingCustomer = await this.prisma.customer.findFirst({
        where: {
          loanId: uniqueCode
        }
      });

      if (!existingCustomer) {
        isUnique = true;
      } else {
        attempts++;
      }
    }

    if (!isUnique) {
      throw new Error('Unable to generate unique loan ID after multiple attempts');
    }

    return uniqueCode;
  }
  private async _customerId() {
    let uniqueCode = '';
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 50; // Increased attempts for random generation
    
    while (!isUnique && attempts < maxAttempts) {
      // Try sequential approach first
      if (attempts < 10) {
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
        } else {
          const last_id = last_application.customerId
          if (last_id.startsWith("CFN")) {
            const _id = last_id.split("CFN")[1]
            const id = parseInt(_id) + 1
            a_id = a_id + id.toString().padStart(4, '0')
          } else {
            // If last ID is not CFN format, start from 0001
            a_id = a_id + "0001"
          }
        }
        uniqueCode = a_id;
      } else {
        // Fall back to random generation
        const randomPin = Math.floor(10000 + Math.random() * 90000).toString();
        uniqueCode = `CFN${randomPin}`;
      }

      // Check if this customer ID already exists
      const existingCustomer = await this.prisma.customer.findFirst({
        where: {
          customerId: uniqueCode
        }
      });

      if (!existingCustomer) {
        isUnique = true;
      } else {
        attempts++;
      }
    }

    if (!isUnique) {
      throw new Error('Unable to generate unique customer ID after multiple attempts');
    }

    return uniqueCode;
  }
}
