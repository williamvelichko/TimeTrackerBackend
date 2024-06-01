import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { UserEntity } from '../user/user.entity';

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
  totalTime: number;

  @Column()
  projectId: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
