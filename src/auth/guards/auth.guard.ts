import {
  InternalServerErrorException,
  UnauthorizedException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Decoded } from '../interfaces/token.interface';
import { JwtAdapter } from 'src/config/adapters';
import { User } from 'src/users/entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('No token provided');
    }

    if (!authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Invalid Bearer token');

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await this.jwtAdapter.verifyToken<Decoded>(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.userRepository.findOneBy({
        email: payload.email,
      });

      if (!user) throw new UnauthorizedException('Invalid token - user');

      req.body.user = user;

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
