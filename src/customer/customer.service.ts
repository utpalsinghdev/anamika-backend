import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer, Status } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CreateMailDto } from 'src/mail/dto/create-mail.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloud: CloudinaryService,
    private readonly mail:MailService,
  ) { }
  async create(CustomerDto: CreateCustomerDto): Promise<Customer> {


    const a_id = await this._loanId();
    const promises = [
      this.cloud.uploadBase64File(CustomerDto.AdharCard),
      this.cloud.uploadBase64File(CustomerDto.panCard),
      this.cloud.uploadBase64File(CustomerDto.photo),
      this.cloud.uploadBase64File(CustomerDto.proofDoc),
    ];
    const [_adhar, _bankProof, _photo, _pan] = await Promise.all(promises);


    const createdCustomer = await this.prisma.customer.create({
      data: {
        loanId: a_id,
        name: CustomerDto.name,
        guardian_relation: CustomerDto.guardian_relation,
        guardian_name: CustomerDto.guardian_name,
        phone: CustomerDto.phone,
        dob: CustomerDto.dob,
        email: CustomerDto.email,
        loanInNumber: CustomerDto.loanInNumber,
        loanInWords: CustomerDto.loanInWords,
        loanYear: CustomerDto.loanYear,
        address: CustomerDto.address,
        status: Status.PENDING,
        agent: {
          connect: {
            id: +CustomerDto.agentId
          }
        },
        district: CustomerDto.district,
        State: CustomerDto.State,
        pinCode: CustomerDto.pinCode,
        bank: CustomerDto.bank,
        AccountNumber: CustomerDto.AccountNumber,
        accountType: CustomerDto.accountType,
        ifsc: CustomerDto.ifsc,
        adharNumber: CustomerDto.adharNumber,
        panNumber: CustomerDto.panNumber,
        bankProof: CustomerDto.bankProof,

        AdharCard: {
          create: {
            name: "Adhar Card",
            url: _adhar.secure_url,
            applicationId: a_id
          }
        },

        proofDoc: {
          create: {
            name: CustomerDto.bankProof,
            url: _bankProof.secure_url,
            applicationId: a_id
          }
        },

        photo: {
          create: {
            name: "Photo",
            applicationId: a_id,
            url: _photo.secure_url
          }
        },
        panCard: {
          create: {
            name: "Pan Card",
            applicationId: a_id,
            url: _pan.secure_url
          }
        },

      },
    });
    const data : CreateMailDto = {
      message : `Hi Mr. Pawan Kumar Welcome to Green Apple Financial Services Pvt Ltd.We have received your loan Application Your application No. is ${a_id} Team will Call You`,
      numbers:CustomerDto.phone
    }
    
    const sms = await this.mail.sendSms(data)
    console.log(sms)
    return createdCustomer;
  }
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const g_customer = await this.prisma.customer.findFirst({ where: { id } })
    const updatedData: any = {
      name: updateCustomerDto.name,
      guardian_relation: updateCustomerDto.guardian_relation,
      guardian_name: updateCustomerDto.guardian_name,
      dob: updateCustomerDto.dob,
      email: updateCustomerDto.email,
      loanInNumber: updateCustomerDto.loanInNumber,
      loanInWords: updateCustomerDto.loanInWords,
      loanYear: updateCustomerDto.loanYear,
      address: updateCustomerDto.address,
      district: updateCustomerDto.district,
      State: updateCustomerDto.State,
      pinCode: updateCustomerDto.pinCode,
      bank: updateCustomerDto.bank,
      AccountNumber: updateCustomerDto.AccountNumber,
      accountType: updateCustomerDto.accountType,
      ifsc: updateCustomerDto.ifsc,
      adharNumber: updateCustomerDto.adharNumber,
      panNumber: updateCustomerDto.panNumber,
      bankProof: updateCustomerDto.bankProof,
    };
    if (updateCustomerDto.password) {
      updatedData.password = await hash(updateCustomerDto.password, 10)
    }
    if (updateCustomerDto.AdharCard) {
      const _adhar = await this.cloud.uploadBase64File(updateCustomerDto.AdharCard);
      updatedData.AdharCard = {
        update: {
          where: { id: g_customer.addharId },
          data: {
            name: "Adhar Card",
            url: _adhar.secure_url,
          },
        },
      };
    }

    if (updateCustomerDto.proofDoc) {
      const _bankProof = await this.cloud.uploadBase64File(updateCustomerDto.proofDoc);
      updatedData.proofDoc = {
        update: {
          where: { id: g_customer.proofId },
          data: {
            name: updateCustomerDto.bankProof,
            url: _bankProof.secure_url,
          },
        },
      };
    }

    if (updateCustomerDto.photo) {
      const _photo = await this.cloud.uploadBase64File(updateCustomerDto.photo);
      updatedData.photo = {
        update: {
          where: { id: g_customer.photoId },
          data: {
            name: "Photo",
            url: _photo.secure_url,
          },
        },
      };
    }

    if (updateCustomerDto.panCard) {
      const _pan = await this.cloud.uploadBase64File(updateCustomerDto.panCard);
      updatedData.panCard = {
        update: {
          where: { id: g_customer.panId },
          data: {
            name: "Pan Card",
            url: _pan.secure_url,
          },
        },
      };
    }

    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: updatedData,
    });

    return updatedCustomer;
  }


  async findAll() {
    const allCustomers = await this.prisma.customer.findMany({
      where: {
        status: Status.PENDING || Status.REJECTED
      },
      include: {
        AdharCard: true,
        panCard: true,
        agent: {
          select: {
            id: true,
            firstName: true,
            LastName: true,
            employeeCode: true,
            phone: true,
            email: true,
          }
        },
        photo: true,
        proofDoc: true
      }
    });

    return allCustomers?.map((e) => {
      let { password, ...rest } = e
      return rest
    })

  }
  async findAllCustomer() {
    const allCustomers = await this.prisma.customer.findMany({
      where: {
        status: Status.APPROVED
      },
      include: {
        AdharCard: true,
        panCard: true,
        agent: {
          select: {
            id: true,
            firstName: true,
            LastName: true,
            employeeCode: true,
            phone: true,
            email: true,
          }
        },
        photo: true,
        proofDoc: true
      }
    });

    return allCustomers?.map((e) => {
      let { password, ...rest } = e
      return rest
    })

  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    return customer;
  }

  async approve(id: number) {

    const cid = await this._customerId()
    const cpas = "123456"
    /**
     * * Generate Password
     * * And send to Customer Via sms
     */
    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: {
        customerId: cid,
        status: Status.APPROVED,
        password: await hash(cpas, 10),
      },
    });
    return updatedCustomer;
  }

  async reject(id: number) {
    const deletedCustomer = await this.prisma.customer.update({
      where: { id },
      data: { status: Status.REJECTED }
    });

    return deletedCustomer;
  }

  async remove(id: number) {
    const deletedCustomer = await this.prisma.customer.delete({
      where: {
        id, customerId: {
          not: null
        }
      },
    });

    return deletedCustomer;
  }

  private async _loanId() {
    const applicationId = await this.prisma.customer.findMany({
      take: 1,
      orderBy: {
        id: 'desc'
      },
    })
    const last_application = applicationId[0]
    let a_id = "GAFAID"
    if (!last_application?.loanId) {
      a_id = a_id + "0001"

      return a_id
    } else {
      const last_id = last_application.loanId
      const _id = last_id.split("GAFAID")[1]
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
    let a_id = "GAFLID"
    if (!last_application?.loanId) {
      a_id = a_id + "0001"

      return a_id
    } else {
      const last_id = last_application.loanId
      const _id = last_id.split("GAFLID")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')

      return a_id
    }


  }
}
