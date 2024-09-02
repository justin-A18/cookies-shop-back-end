import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsBoolean()
  @IsNotEmpty()
  isNovelty: boolean;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
