import { ApiProperty } from '@nestjs/swagger';

export class Paymentqr {
    @ApiProperty()
    id: string;

    @ApiProperty({ required: false })
    url?: string;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    email?: string;

    @ApiProperty({ required: false })
    bankName?: string;

    @ApiProperty({ required: false })
    accountNo?: string;

    @ApiProperty({ required: false })
    holderName?: string;

    @ApiProperty({ required: false })
    ifsc?: string;

    @ApiProperty({ required: false })
    fileCharge?: string;

    @ApiProperty({ type: [String], required: false })
    phoneNumbers?: string[];

    @ApiProperty({ type: [String], required: false })
    addresses?: string[];

    @ApiProperty({ required: false })
    icardIsPdf?: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
