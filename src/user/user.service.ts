import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSingleUserDto } from './dto/create-single-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      const result = await this.userRepository.findOne({ where: { email } });
      return result;
    } catch (error) {
      console.error('Error querying database:', error);
      throw error;
    }
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    try {
      const result = await this.userRepository.findOne({ where: { id } });
      return result;
    } catch (error) {
      console.error('Error querying database:', error);
      throw error;
    }
  }

  async createUserWithPassword(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        createdAt: new Date(),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user with password:', error);
      throw error;
    }
  }

  async createSingleUser(
    createSingleUserDto: CreateSingleUserDto,
  ): Promise<UserEntity> {
    try {
      if (!createSingleUserDto.name || !createSingleUserDto.email) {
        throw new BadRequestException('Name and email are required');
      }
      const newUser = this.userRepository.create({
        ...createSingleUserDto,
        password: '',
        createdAt: new Date(),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating single user:', error);
      throw error;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | undefined> {
    try {
      const userToUpdate = await this.findOneById(id);
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

  async delete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { message: `User with id ${id} successfuly deleted` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
