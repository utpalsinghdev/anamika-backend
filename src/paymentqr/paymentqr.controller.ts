import { Controller, Get, Res, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PaymentqrService } from './paymentqr.service';
import { CreatePaymentqrDto } from './dto/create-paymentqr.dto';
import { UpdatePaymentqrDto } from './dto/update-paymentqr.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';

@Controller('payment-qr')
export class PaymentqrController {
  constructor(private readonly paymentqrService: PaymentqrService) { }
  data
    :
    {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createPaymentqrDto: CreatePaymentqrDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Uploaded Successfully",
        data: await this.paymentqrService.create(createPaymentqrDto)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
  }

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All News Fetched",
        data: await this.paymentqrService.getQR()
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
  }

  @Post("upload-qr-code")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/qr/')
        },
        filename: (req, file, cb) => {
          cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`)
        }
      }),
    }),
  )
  async uploadQr(@UploadedFile() file: any, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Uploaded Successfully",
        data: {
          url: file.path
        }
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
  }


}
