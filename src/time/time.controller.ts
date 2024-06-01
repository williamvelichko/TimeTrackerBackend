import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeService } from './time.service';
import { Public } from 'src/auth/public-strategy';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@ApiTags('Time')
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Public()
  @Post(':userId/create')
  @HttpCode(HttpStatus.OK)
  async createTimeTrack(
    @Body() createTimeDto: CreateTimeDto,
    @Param('userId') userId: number,
  ) {
    return await this.timeService.create(createTimeDto, userId);
  }

  @Public()
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getAllByUser(@Param('userId') userId: number) {
    return await this.timeService.getAllByUser(userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async editTimeTrack(
    @Param('id') id: number,
    @Body() updateTimeDto: UpdateTimeDto,
  ) {
    return await this.timeService.edit(id, updateTimeDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTimeTrack(@Param('id') id: number): Promise<{ message: string }> {
    return await this.timeService.delete(id);
  }
}
