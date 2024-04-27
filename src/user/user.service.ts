import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
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
      const result = await this.userRepository.save({
        ...createUserDto,
        createdAt: new Date(),
      });

      return result;
    } catch (error) {
      console.error('Error crearting user', error);
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

  async viewUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
}
