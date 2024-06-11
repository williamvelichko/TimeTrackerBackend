import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateTimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  projectDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty()
  @IsOptional()
  totalTime?: number;

  @ApiProperty()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
