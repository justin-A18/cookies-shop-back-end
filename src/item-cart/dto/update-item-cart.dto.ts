import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCartDto } from './create-item-cart.dto';

export class UpdateItemCartDto extends PartialType(CreateItemCartDto) {}
