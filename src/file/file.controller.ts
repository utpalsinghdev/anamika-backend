import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() createFileDto) {
    try {
      return {
        success: true,
        message: "file",
        data: await this.fileService.create(file)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }

}
