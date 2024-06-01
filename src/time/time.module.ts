import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeService } from './time.service';
import { TimeEntity } from './time.entity';
import { TimeController } from './time.controller';
import { ProjectModule } from '../project/project.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntity]), ProjectModule, UsersModule],
  controllers: [TimeController],
  providers: [TimeService],
  exports: [TimeService],
})
export class TimeModule {}
