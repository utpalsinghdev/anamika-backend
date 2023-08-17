import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});
interface File {
    fieldname?: string;
    path?: string;
    size: number;
    mimetype?: string;
    filename?: string;
    originalname: string;
    buffer: Buffer;
}
export class Utils {
    async uploadToCloudinary(file: File): Promise<Object> {
        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private
}