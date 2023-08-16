import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { DeploymentController } from './deployment/deployment.controller';

@Module({
  imports: [UserModule, MessageModule],
  controllers: [AppController, DeploymentController],
  providers: [AppService],
})
export class AppModule {}
