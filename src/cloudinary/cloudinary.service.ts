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
    async saveBase64File(base64Data: string, fileExtension: string): Promise<string> {
        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const fileName = `${Date.now()}-${fileExtension}`;
        const filePath = path.join(uploadsFolder, fileName);

        // Create the uploads folder if it doesn't exist
        if (!fs.existsSync(uploadsFolder)) {
            fs.mkdirSync(uploadsFolder, { recursive: true });
        }

        const fileData = base64Data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(fileData, 'base64');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, buffer, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(filePath);
                }
            });
        });
    }
    async deleteFile(publicId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}



