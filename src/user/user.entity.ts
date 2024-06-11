import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TimeEntity } from '../time/time.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TimeEntity, (time) => time.user)
  timeEntries: TimeEntity[];
}
