import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { familyAttributes } from './family-attributes.schema';
import { CreateFamilyAttributes } from './_utils/types/family-attributes.types';

@Injectable()
export class FamilyAttributesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(relations: CreateFamilyAttributes[]) {
    return this.databaseService.db
      .insert(familyAttributes)
      .values(relations)
      .returning();
  }
}
