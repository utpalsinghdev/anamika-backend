import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './startegy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN || "10d",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, MailService, AuthService, JwtStrategy, CloudinaryService],
})
export class AuthModule { }
