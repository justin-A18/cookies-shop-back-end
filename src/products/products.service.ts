import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private async uploadImagesToCloudinary(
    images: Array<Express.Multer.File>,
  ): Promise<string[]> {
    try {
      const uploadPromises = images.map((image) =>
        this.cloudinaryService.uploadImage(image.path),
      );

      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async deleteImagesFromCloudinary(images: string[]) {
    try {
      const deletePromises = images.map((image) =>
        this.cloudinaryService.deleteImage(image),
      );

      await Promise.all(deletePromises);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createProductDto: CreateProductDto) {
    const { images, ...product } = createProductDto;

    const uploadImages = await this.uploadImagesToCloudinary(images);

    const newProduct = this.productsRepository.create({
      ...product,
      images: uploadImages,
    });

    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productsRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      products,
    };
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...productUpdate } = updateProductDto;

    let uploadImages: string[] = [];

    if (images && images.length > 0) {
      const product = await this.findOne(id);
      await this.deleteImagesFromCloudinary(product.images);
      uploadImages = await this.uploadImagesToCloudinary(images);
    }

    const newProduct = {
      ...productUpdate,
      images: uploadImages,
    };

    const product = await this.productsRepository.preload({
      id,
      ...newProduct,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepository.save(product);

    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.deleteImagesFromCloudinary(product.images);
    await this.productsRepository.remove(product);
    return product;
  }
}
