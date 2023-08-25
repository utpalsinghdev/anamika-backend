import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentSalaryDto } from './create-appointment-salary.dto';

export class UpdateAppointmentSalaryDto extends PartialType(CreateAppointmentSalaryDto) {}
