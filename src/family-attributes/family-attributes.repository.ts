import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { familyAttributes } from './family-attributes.schema';
import {
  FamilyAttributesInsert,
  FamilyAttributesSelect,
} from './_utils/types/family-attributes.types';

@Injectable()
export class FamilyAttributesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(
    relations: FamilyAttributesInsert[],
  ): Promise<FamilyAttributesSelect[]> {
    return this.databaseService.db
      .insert(familyAttributes)
      .values(relations)
      .returning();
  }
}
