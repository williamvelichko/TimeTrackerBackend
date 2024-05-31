import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TimeController } from './time/time.controller';
import { TimeModule } from './time/time.module';
const dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_LINK,
      entities: [UserEntity],
      // synchronize: process.env.NODE_ENV !== 'production',
      synchronize: false,
      //logging: process.env.NODE_ENV !== 'production',
    }),
    HelloWorldModule,
    AuthModule,
    TimeModule,
  ],
  controllers: [AppController, AuthController, TimeController],
  providers: [AppService],
})
export class AppModule {}
