import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter, JwtAdapter],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
