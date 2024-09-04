import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Roles {
  USER_ROLE = 'USER_ROLE',
  ADMIN_ROLE = 'ADMIN_ROLE',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER_ROLE })
  role: Roles;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('bool', { default: false })
  isValidEmail: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];
}
