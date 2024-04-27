import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy(email);

    if (!user) {
      throw new UnauthorizedException('User with this email doesnt exist');
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const userResult = await this.usersService.findOneBy(payload.email);
    console.log(userResult);
    if (userResult) {
      throw new UnauthorizedException('User with this email already exists');
    }
    //return await this.usersService.deleteUsers();
    const user = await this.usersService.create(payload);
    console.log(user);
    return user;
  }

  async getAllUsers() {
    const result = await this.usersService.viewUsers();
    return result;
    // return await this.usersService.deleteUsers();
  }
}
