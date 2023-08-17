import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

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
}
