import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('float')
  price: number;

  @Column('text', { array: true })
  images: string[];

  @Column('boolean', { default: false })
  isNovelty: boolean;

  @Column('int')
  stock: number;

  @Column('text')
  description: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];
}
