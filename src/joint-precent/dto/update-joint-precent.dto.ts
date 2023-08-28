import { PartialType } from '@nestjs/swagger';
import { CreateJointPrecentDto } from './create-joint-precent.dto';

export class UpdateJointPrecentDto extends PartialType(CreateJointPrecentDto) {}
