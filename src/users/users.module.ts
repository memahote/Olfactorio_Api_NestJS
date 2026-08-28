import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UserMapper } from './users.mapper';

@Module({
  providers: [UsersService, UsersRepository, UserMapper],
  controllers: [UsersController],
  exports: [UsersService, UserMapper],
  imports: [DatabaseModule]
})
export class UsersModule {}
