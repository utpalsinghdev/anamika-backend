import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer, Status } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { hash } from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloud: CloudinaryService
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
    return createdCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const allCustomers = await this.prisma.customer.findMany();
    return allCustomers;
  }

  async findOne(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: {
        customerId: "GAFLID" + id.toString().padStart(4, '0'),
        password: await hash("updateCustomerDto.password", 10),
      },
    });
    return updatedCustomer;
  }

  async remove(id: number): Promise<Customer> {
    const deletedCustomer = await this.prisma.customer.delete({
      where: { id },
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
