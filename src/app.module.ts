import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { MessageModule } from './message/message.module'
import { PrismaService } from './prisma/prisma.service'
import { AgentModule } from './agent/agent.module';
import { AgentApplicationModule } from './agent-application/agent-application.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NewModule } from './new/new.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { WelcomeLetterModule } from './welcome-letter/welcome-letter.module';
import { IcardModule } from './icard/icard.module';
import { AppointmentSalaryModule } from './appointment-salary/appointment-salary.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ApprovalLetterModule } from './approval-letter/approval-letter.module';
import { JointPrecentModule } from './joint-precent/joint-precent.module';
import { MailModule } from './mail/mail.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [UserModule, MessageModule, AgentModule, AgentApplicationModule, CloudinaryModule, NewModule, AuthModule, CustomerModule, WelcomeLetterModule, IcardModule, AppointmentSalaryModule, InvoiceModule, ApprovalLetterModule, JointPrecentModule, MailModule, FileModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule { }
