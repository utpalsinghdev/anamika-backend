import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApprovalLetterService } from './approval-letter.service';
import { CreateApprovalLetterDto } from './dto/create-approval-letter.dto';
import { UpdateApprovalLetterDto } from './dto/update-approval-letter.dto';
import { Response } from 'express';
@Controller('approval-letter')
export class ApprovalLetterController {
  constructor(private readonly approvalLetterService: ApprovalLetterService) { }

  @Post()
  async create(@Body() createApprovalLetterDto: CreateApprovalLetterDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Approval Letter Created Successfully !!",
        data: await this.approvalLetterService.create(createApprovalLetterDto)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }
  @Get("/automation")
  async buildAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All Approval Letter Fetched Successfully !!",
        data: await this.approvalLetterService.automation()
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }

  @Get('/re-generate/:id')
  async regenerate(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Approval Letter Regenerated Successfully !!",
        data: await this.approvalLetterService.reGenerate(+id)
      }


    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All Approval Letter Fetched Successfully !!",
        data: await this.approvalLetterService.findAll()
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Approval Letter Fetched Successfully !!",
        data: await this.approvalLetterService.findOne(+id)
      }


    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateApprovalLetterDto: UpdateApprovalLetterDto, @Res({ passthrough: true }) res: Response) {
    try {

    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

    return this.approvalLetterService.update(+id, updateApprovalLetterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Approval Letter Deleted Successfully !!",
        data: await this.approvalLetterService.remove(+id)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message || "Internal Server error !!"
      }
    }

  }
}
