import { Module } from '@nestjs/common';
import { AgentApplicationService } from './agent-application.service';
import { AgentApplicationController } from './agent-application.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AgentApplicationController],
  providers: [AgentApplicationService, PrismaService],
})
export class AgentApplicationModule {}
