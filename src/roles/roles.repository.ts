import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { roles } from './roles.schema';
import { CreateRoleDto } from './utils/dtos/requests/create-role.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class RolesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createRoleDto: CreateRoleDto,
  ): Promise<typeof roles.$inferInsert | undefined> {
    const [role] = await this.databaseService.db
      .insert(roles)
      .values({
        name: createRoleDto.name,
      })
      .returning();

    return role;
  }

  async getRoles() {
    return this.databaseService.db.select().from(roles);
  }

  async findByName(
    name: string,
  ): Promise<typeof roles.$inferSelect | undefined> {
    const [role] = await this.databaseService.db
      .select()
      .from(roles)
      .where(eq(roles.name, name));

    return role;
  }

  async findById(id: string): Promise<typeof roles.$inferSelect | undefined> {
    const [role] = await this.databaseService.db
      .select()
      .from(roles)
      .where(eq(roles.id, id));

    return role;
  }

  async delete(id: string): Promise<typeof roles.$inferSelect | undefined> {
    const [role] = await this.databaseService.db
      .delete(roles)
      .where(eq(roles.id, id))
      .returning();

    return role;
  }
}
