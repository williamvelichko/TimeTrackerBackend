import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneBy(email: string): Promise<UserEntity | undefined> {
    try {
      const result = await this.userRepository.findOne({
        where: { email: email },
      });
      return result;
    } catch (error) {
      console.error('Error querying database:', error);
      throw error;
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const result = await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return result;
    } catch (error) {
      console.error('Error creating user', error);
      throw error;
    }
  }
  async createSingleUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      if (!createUserDto.name || !createUserDto.email) {
        throw new BadRequestException('Name and email are required');
      }
      const newUser = await this.userRepository.save({
        ...createUserDto,
        createdAt: new Date(),
      });
      return newUser;
    } catch (error) {
      console.error('Error creating single user:', error);
      throw error;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | undefined> {
    try {
      const userToUpdate = await this.findOneBy(id);
      if (!userToUpdate) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const updatedUser = await this.userRepository.save({
        ...userToUpdate,
        ...updateUserDto,
        updatedAt: new Date(),
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUsers(): Promise<void> {
    try {
      await this.userRepository.delete({});
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { message: `User with id: ${id} successfuly deleted` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async viewUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
}
