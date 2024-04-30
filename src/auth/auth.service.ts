import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy(email);

    if (!user) {
      throw new UnauthorizedException(`User with this email doesn't exist`);
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Incorrect password`);
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const userResult = await this.usersService.findOneBy(payload.email);

    if (userResult) {
      throw new UnauthorizedException(`User with this email already exists`);
    }

    const user = await this.usersService.create(payload);
    return user;
  }

  async getAllUsers() {
    const result = await this.usersService.viewUsers();
    return result;
  }
}
