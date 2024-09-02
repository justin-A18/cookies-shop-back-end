import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter, JwtAdapter, AuthGuard, RoleGuard],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, AuthGuard, JwtAdapter, RoleGuard],
})
export class AuthModule {}
