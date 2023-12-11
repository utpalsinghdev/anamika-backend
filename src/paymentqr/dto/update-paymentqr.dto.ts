import { PartialType } from '@nestjs/swagger';
import { CreatePaymentqrDto } from './create-paymentqr.dto';

export class UpdatePaymentqrDto extends PartialType(CreatePaymentqrDto) {}
