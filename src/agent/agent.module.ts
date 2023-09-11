import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AgentController],
  providers: [AgentService, PrismaService, MailService],
})
export class AgentModule {}
