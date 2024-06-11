import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateSingleUserDto } from './dto/create-single-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createSingleUser(
    @Body() createSingleUserDto: CreateSingleUserDto,
  ): Promise<UserEntity> {
    return this.userService.createSingleUser(createSingleUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.userService.delete(id);
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
