import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends PartialType(LoginUserDto) {
  @IsString()
  @IsNotEmpty()
  username: string;
}
