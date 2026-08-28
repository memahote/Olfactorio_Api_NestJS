import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './_utils/dtos/requests/create-user.dto';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async findByEmail(email: string) {
    return this.userMapper.toGetUserDto(
      await this.usersRepository.findByEmail(email),
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userMapper.toGetUserDto(
      await this.usersRepository.create(createUserDto),
    );
  }

  async findById(id: string) {
    return this.userMapper.toGetUserDto(
      await this.usersRepository.findById(id),
    );
  }

  async findByEmailForAuth(email: string) {
    return this.usersRepository.findByEmail(email)
  }
}
