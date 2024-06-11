import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TimeEntity } from '../time/time.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TimeEntity, (time) => time.project)
  timeEntries: TimeEntity[];
}
