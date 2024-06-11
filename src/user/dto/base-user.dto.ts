import { ApiProperty } from '@nestjs/swagger';

export class BaseUser {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  confirmPassword?: string;

  @ApiProperty({ required: false })
  designation?: string;
}
