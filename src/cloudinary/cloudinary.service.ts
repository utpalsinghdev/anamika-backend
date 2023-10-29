import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
            api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
        });
    }

    async uploadBase64File(base64Data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    async uploadMultipartFile(file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);
            const fileStream = fs.createWriteStream(filePath);
            fileStream.on('error', (error) => {
                reject(error);
            });
            fileStream.on('finish', () => {
                cloudinary.uploader.upload(filePath, (error, result) => {
                    fs.unlinkSync(filePath);
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            fileStream.write(file.buffer);
            fileStream.end();
        });
    }
}



