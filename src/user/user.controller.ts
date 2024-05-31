import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createSingleUser(createUserDto);
  }

  // Update an existing user
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  // Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const deleted = await this.userService.delete(id);
  }

  // Get a single user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findOneBy(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Get all users
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.viewUsers();
  }
}
