import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Response } from 'express';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
 async create(@Body() createInvoiceDto: CreateInvoiceDto, @Res({ passthrough: true }) res:Response) {
   try {
    return {
      success: true,
      data:await this.invoiceService.create(createInvoiceDto),
      message:"Invoice Created Successfully !!"
    }
   } catch (error) {
    res.status(error.status || 500)
    return {
      success: false,
      data:null,
      message:error.message || "Internal Server Error !!"
    }
   }
  
  }

  @Get()
 async findAll(@Res({ passthrough: true }) res:Response) {
   try {
      return{
        success: true,
        data:await this.invoiceService.findAll(),
        message:"All Invoices Fetched Successfully !!"
      }
    
   } catch (error) {
    res.status(error.status || 500)
    return {
      success: false,
      data:null,
      message:error.message || "Internal Server Error !!"
    }
   }
  
  }

  @Get(':id')
 async findOne(@Param('id') id: string , @Res({ passthrough: true }) res:Response) {
   try {
    
   } catch (error) {
    res.status(error.status || 500)
    return {
      success: false,
      data:null,
      message:error.message || "Internal Server Error !!"
    }
   }
  
  return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto , @Res({ passthrough: true }) res:Response) {
   try {
    
   } catch (error) {
    res.status(error.status || 500)
    return {
      success: false,
      data:null,
      message:error.message || "Internal Server Error !!"
    }
   }
  
  return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string , @Res({ passthrough: true }) res:Response) {
   try {
      return {
        success: true,
        data:await this.invoiceService.remove(+id),
        message:"Invoice Deleted Successfully !!"
      }
   } catch (error) {
    res.status(error.status || 500)
    return {
      success: false,
      data:null,
      message:error.message || "Internal Server Error !!"
    }
   }
  
  }
}
