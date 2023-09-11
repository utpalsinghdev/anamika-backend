import { Module } from '@nestjs/common';
import { JointPrecentService } from './joint-precent.service';
import { JointPrecentController } from './joint-precent.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AgentService } from 'src/agent/agent.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [JointPrecentController],
  providers: [JointPrecentService,MailService, PrismaService, CloudinaryService, AgentService],
})
export class JointPrecentModule { }
