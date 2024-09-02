import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Product, (producto) => producto.cart, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('int')
  quantity: number;
}
