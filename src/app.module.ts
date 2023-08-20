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

@Module({
  imports: [UserModule, MessageModule, AgentModule, AgentApplicationModule, CloudinaryModule, NewModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule { }
