/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

import { Decoded } from './interfaces/token.interface';
import { User } from 'src/users/entities';

import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from './dto';

import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAdapter: JwtAdapter,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly mailerService: MailerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      email: loginUserDto.email,
    });

    if (!user) throw new NotFoundException('Credenciales inválidas');

    if (!user.isValidEmail)
      throw new NotFoundException('La cuenta no está confirmada');

    const isValidPassword = await this.bcryptAdapter.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isValidPassword) throw new NotFoundException('Credenciales inválidas');

    const token = await this.generateUserToken(user);

    const { password, ...resUser } = user;

    return { token, user: resUser };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await this.userRepository.findOneBy({
      email: registerUserDto.email,
    });

    if (existUser)
      throw new NotFoundException('Ya existe un usuario con ese email');

    const user = this.userRepository.create(registerUserDto);
    user.password = await this.bcryptAdapter.hash(registerUserDto.password);

    await this.userRepository.save(user);
    const token = await this.generateUserToken(user);

    await this.sendWelcomeEmail(user, token);

    const { password, ...resUser } = user;

    return {
      message: 'Usuario registrado correctamente',
    };
  }

  async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
    const email = await this.checkUserToken(token);
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.password = await this.bcryptAdapter.hash(changePasswordDto.password);
    await this.userRepository.update(user.id, user);

    return { message: 'Contraseña actualizada' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOneBy({
      email: resetPasswordDto.email,
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const token = await this.generateUserToken(user);
    await this.sendPasswordResetEmail(user, token);

    return { message: 'Se ha enviado un enlace para cambiar tu contraseña' };
  }

  private async generateUserToken(user: User) {
    return this.jwtAdapter.generateToken({ id: user.id, email: user.email });
  }

  private async sendWelcomeEmail(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Bienvenido a nuestra tienda de galletas',
      html: `
        <h1>Bienvenido ${user.username} a nuestra tienda de galletas</h1>
        <p>Para confirmar tu cuenta haz click en el siguiente enlace</p>
        <a href="${process.env.APP_URL}/auth/confirm/${token}">Confirmar cuenta</a>
      `,
    });
  }

  private async sendPasswordResetEmail(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Cambio de contraseña',
      html: `
        <h1>Cambio de contraseña</h1>
        <p>Para cambiar tu contraseña haz click en el siguiente enlace</p>
        <a href="${process.env.APP_URL}/auth/reset/${token}">Cambiar contraseña</a>
      `,
    });
  }

  private async checkUserToken(token: string) {
    try {
      const { email } = await this.jwtAdapter.verifyToken<Decoded>(token);
      if (!email) throw new NotFoundException('Usuario no encontrado');
      return email;
    } catch (error) {
      throw new InternalServerErrorException('Token inválido');
    }
  }

  async validateEmail(token: string) {
    const email = await this.checkUserToken(token);
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.isValidEmail = true;
    await this.userRepository.update(user.id, user);

    return { message: 'Cuenta confirmada' };
  }
}
