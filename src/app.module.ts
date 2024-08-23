import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { validationHelper } from './config/helpers';

import { User } from './users/entities';
import { ProductosModule } from './productos/productos.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { OrderModule } from './order/order.module';
import { ItemCartModule } from './item-cart/item-cart.module';

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
      entities: [User],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAIL_USER}:${process.env.MAIL_PASS}@${process.env.MAIL_HOST}`,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    ProductosModule,
    ShoppingCartModule,
    OrderModule,
    ItemCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
