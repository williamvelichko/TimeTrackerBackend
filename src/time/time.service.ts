import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntity } from './time.entity';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(TimeEntity)
    private timeRepository: Repository<TimeEntity>,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  async create(
    createTimeDto: CreateTimeDto,
    userId: number,
  ): Promise<TimeEntity> {
    const project = await this.projectService.getProjectById(
      createTimeDto.projectId,
    );
    const user = await this.userService.findOneById(userId);

    if (!project || !user) {
      throw new NotFoundException('Project or User not found');
    }

    const projectDate = new Date(createTimeDto.projectDate);
    const startTimeDate = new Date(projectDate + 'T' + createTimeDto.startTime);
    const endTimeDate = new Date(projectDate + 'T' + createTimeDto.endTime);
    const totalTime = (endTimeDate.getTime() - startTimeDate.getTime()) / 60000; // in minutes

    console.log(projectDate, startTimeDate, endTimeDate, totalTime);

    const newTime = this.timeRepository.create({
      ...createTimeDto,
      project,
      user,
      projectDate,
      totalTime,
    });

    return this.timeRepository.save(newTime);
  }
  async getAllByUser(userId: number): Promise<TimeEntity[]> {
    const times = await this.timeRepository.find({
      where: { user: { id: userId } },
      relations: ['project', 'user'],
    });

    if (!times.length) {
      throw new NotFoundException('No time entries found for this user');
    }

    return times;
  }

  async edit(id: number, updateTimeDto: UpdateTimeDto): Promise<TimeEntity> {
    const time = await this.timeRepository.findOne({ where: { id } });

    if (!time) {
      throw new NotFoundException('Time entry not found');
    }
    Object.assign(time, updateTimeDto);

    return this.timeRepository.save(time);
  }

  async delete(id: number): Promise<{ message: string }> {
    const time = await this.timeRepository.findOne({ where: { id } });

    if (!time) {
      throw new NotFoundException('Time entry not found');
    }

    await this.timeRepository.remove(time);
    return { message: 'Time Entry successfuly deleted' };
  }
}
