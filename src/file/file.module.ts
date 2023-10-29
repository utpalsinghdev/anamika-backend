import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [FileController],
  providers: [FileService, CloudinaryService],
})
export class FileModule { }
