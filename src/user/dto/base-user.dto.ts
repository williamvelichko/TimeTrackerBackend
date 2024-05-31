import { ApiProperty } from '@nestjs/swagger';
export class BaseUser {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword?: string;
  @ApiProperty()
  designation?: string;
}
