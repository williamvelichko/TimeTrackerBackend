import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntity } from './time.entity';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ProjectEntity } from '../project/project.entity'; // Adjust the path as necessary
import { UserEntity } from '../user/user.entity'; // Adjust the path as necessary

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(TimeEntity)
    private readonly timeRepository: Repository<TimeEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createTimeDto: CreateTimeDto): Promise<TimeEntity> {
    const project = await this.projectRepository.findOne(
      createTimeDto.projectId,
    );
    const user = await this.userRepository.findOne(createTimeDto.userId);
    if (!project || !user) {
      throw new NotFoundException('Project or User not found');
    }
    const newTime = this.timeRepository.create({
      ...createTimeDto,
      project,
      user,
    });
    return this.timeRepository.save(newTime);
  }
}
