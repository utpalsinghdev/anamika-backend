import { Module } from '@nestjs/common';
import { JointPrecentService } from './joint-precent.service';
import { JointPrecentController } from './joint-precent.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AgentService } from 'src/agent/agent.service';

@Module({
  controllers: [JointPrecentController],
  providers: [JointPrecentService, PrismaService, CloudinaryService, AgentService],
})
export class JointPrecentModule { }
