import { Module } from '@nestjs/common';
import { AgentApplicationService } from './agent-application.service';
import { AgentApplicationController } from './agent-application.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { Utils } from 'src/utils/utils.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AgentApplicationController],
  providers: [AgentApplicationService, PrismaService, Utils, CloudinaryService, MailService],
})
export class AgentApplicationModule { }
