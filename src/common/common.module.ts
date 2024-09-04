import { Module } from '@nestjs/common';
import { FilesService } from './services/files/files.service';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';

@Module({
  imports: [],
  providers: [FilesService, CloudinaryService],
  exports: [FilesService, CloudinaryService],
})
export class CommonModule {}
