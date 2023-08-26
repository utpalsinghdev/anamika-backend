import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { AuthDto } from './dto/admin-auth.dto';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }
  async create(createAuthDto: AuthDto) {
    return 'This action adds a new auth';
  }
  async createAdmin(payload: CreateAdminDto) {
    const applicationId = await this.prisma.employee.findMany({
      take: 1,
      orderBy: {
        id: 'desc'
      }
    })
    const last_application = applicationId[0]
    let a_id = "GAEID"
    if (!last_application?.employeeCode) {
      a_id = a_id + "0001"
    } else {
      const last_id = last_application.employeeCode
      const _id = last_id.split("GAEID")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')
    }
    const new_admin = await this.prisma.employee.create({
      data: {
        firstName: payload.firstName,
        LastName: payload.LastName,
        role: "ADMIN",
        status: "APPROVED",
        password: await hash(payload.password, 10),
        employeeCode: a_id
      },

    })
    const { password, title, city, phone, email, resumeId, status, park, joinedAt, ...rest } = new_admin
    return rest
  }

  async admin(userInfo: AuthDto) {
    const find_em = await this.prisma.employee.findFirst({
      where: {
        employeeCode: userInfo.Id,
        role: "ADMIN"
      }
    })
    if (!find_em) {
      throw new HttpException('Invalid Credentials', HttpStatus.NOT_FOUND);
    }
    const hashPassword = await compare(userInfo.password, find_em.password)
    if (!hashPassword) {
      throw new HttpException("Password doesn't match", HttpStatus.NOT_ACCEPTABLE);
    }
    const { password, title, city, phone, email, resumeId, status, park, joinedAt, ...rest } = find_em;
    const token = this._createToken(rest);
    return {
      ...token,
      user: rest,
    };
  }

  async agent(userInfo: AuthDto) {
    const find_em = await this.prisma.employee.findFirst({
      where: {
        employeeCode: userInfo.Id,
        role: {
          not: "ADMIN"
        }
      }
    })
    if (!find_em) {
      throw new HttpException('Invalid Credentials', HttpStatus.NOT_FOUND);
    }
    const hashPassword = await compare(userInfo.password, find_em.password)
    if (!hashPassword) {
      throw new HttpException("Password doesn't match", HttpStatus.NOT_ACCEPTABLE);
    }
    const { password, title, city, phone, email, resumeId, status, park, joinedAt, ...rest } = find_em;
    const token = this._createToken(rest);
    return {
      ...token,
      user: rest,
    };
  }

  async update(id: number, updateAuthDto: AuthDto) {
    return `This action updates a #${id} auth`;
  }

  async adminDash() {
    return {
      customers: await this.prisma.customer.count(),
      agent: await this.prisma.employee.count({
        where: {
          role: {
            not: "ADMIN"
          }
        }
      }),
      approvals: await this.prisma.approvalLetter.count(),
      news: await this.prisma.news.count(),

    };
  }
  async profile(id: number) {
    return await this.prisma.employee.findFirst({
      where: { id }, include: {
        AppointmentSalary: true,
        Customer: {
          include: {
            ApprovalLetter: {
              include:{
                customer: true
              }
            }
          }
        },
        WelcomeLetter: {
          include:{
            for:true
          }
        },
        managing:true


      }
    })
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  private _createToken({ id, role }) {
    const user: any = { id, role };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }
}
