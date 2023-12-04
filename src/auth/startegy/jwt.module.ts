import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [

    ],
    controllers: [],
    providers: [PrismaService, JwtStrategy],
})
export class AuthModule { }
