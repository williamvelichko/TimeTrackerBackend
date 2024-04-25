import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoRepository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {}
  async findOneBy(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }
}
