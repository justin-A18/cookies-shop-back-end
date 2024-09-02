import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { validationHelper } from './config/helpers';

import { Product } from './products/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { User } from './users/entities';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validationHelper,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product, Cart],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAIL_USER}:${process.env.MAIL_PASS}@${process.env.MAIL_HOST}`,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    CartModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
