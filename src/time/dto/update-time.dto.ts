import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class UpdateTimeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  projectDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalTime?: number;

  @ApiProperty()
  @IsOptional()
  projectId?: number;

  @ApiProperty()
  @IsOptional()
  userId?: number;
}
