import { Injectable } from '@nestjs/common';
import { users } from './users.schema';
import { DatabaseService } from 'src/database/database.service';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './_utils/dtos/requests/create-user.dto';
import { roles } from 'src/roles/roles.schema';

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

    return user;
  }

  async findByIdWithRole(id: string) {
  const [user] = await this.databaseService.db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      role: roles.name,
    })
    .from(users)
    .innerJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.id, id));

  return user;
}
}
