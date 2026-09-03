import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { exploredFamilies } from './explored_familes.schema';

@Injectable()
export class ExploredFamiliesRepository {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }
  
  async create(userId: string, familyId: string) {
    return this.databaseService.db
      .insert(exploredFamilies)
      .values({
        userId,
        familyId,
      })
      .onConflictDoNothing();
  }
}
