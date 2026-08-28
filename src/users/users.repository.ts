import { Injectable } from '@nestjs/common';
import { users } from './users.schema';
import { DatabaseService } from 'src/database/database.service';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './_utils/dtos/requests/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string) {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const [user] = await this.databaseService.db
      .insert(users)
      .values(createUserDto)
      .returning();

    return user;
  }

  async findById(id: string) {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    
    return user
  }
}
