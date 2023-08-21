import { PartialType } from '@nestjs/swagger';
import { CreateAgentApplicationDto } from './create-agent-application.dto';
import { ROLE } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAgentApplicationDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    LastName: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["AGENT", "DEALERSHIP", "FEILDOFFICER"])
    role: ROLE

    @IsNotEmpty()
    @IsString()
    Email: string

    @IsNotEmpty()
    @IsString()
    Phone: string

    @IsNumber()
    @IsOptional()
    workUnder: number

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    designation: string
}
