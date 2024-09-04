import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  public async uploadImage(image: string) {
    try {
      const { secure_url } = await cloudinary.uploader.upload(image);
      return secure_url;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deleteImage(image: string) {
    try {
      const nombreArr = image.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');

      await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
