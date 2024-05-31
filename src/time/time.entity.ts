import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity } from '../project/project.entity'; // Adjust the path as necessary
import { UserEntity } from '../user/user.entity'; // Adjust the path as necessary

@Entity('time')
export class TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'date' })
  projectDate: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ type: 'int', nullable: true })
  totalTime: number; // Total time in minutes or seconds

  @ManyToOne(() => ProjectEntity, (project) => project.times, {
    nullable: false,
  })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.times, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
