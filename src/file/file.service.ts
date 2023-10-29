import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(private readonly cloud: CloudinaryService) {}

  async create(file) {
    const result = await this.cloud.uploadMultipartFile(file);
    return result.secure_url;
  }
}
