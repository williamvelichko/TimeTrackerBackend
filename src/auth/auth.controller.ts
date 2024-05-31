import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseUser } from 'src/user/dto/base-user.dto';
import { Public } from './public-strategy';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  signUp(@Body() signUpDto: Record<string, any>) {
    const payload = {
      email: signUpDto.email,
      password: signUpDto.password,
      name: '',
      createdAt: new Date(),
    };
    return this.authService.signUp(payload);
  }
  @Public()
  @Get('users')
  @ApiOperation({ summary: 'View All Users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [BaseUser], // Assuming BaseUser DTO represents user data
  })
  viewAllUsers() {
    return this.authService.getAllUsers();
  }
}
