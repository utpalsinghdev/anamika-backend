import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { MessageModule } from './message/message.module'
import { PrismaService } from './prisma/prisma.service'
import { AgentModule } from './agent/agent.module';
import { AgentApplicationModule } from './agent-application/agent-application.module';

@Module({
  imports: [UserModule, MessageModule, AgentModule, AgentApplicationModule],
  controllers: [AppController],
  providers: [PrismaService ,AppService],
})
export class AppModule {}
