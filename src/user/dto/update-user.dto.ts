import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from './base-user.dto';

export class UpdateUserDto extends BaseUser {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  designation?: string;
}
