import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { familyAttributes } from './family_attributes.schema';
import {
  FamilyAttributesInsert,
  FamilyAttributesSelect,
} from './_utils/types/family_attributes.types';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class FamilyAttributesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) {}

  async createMany(
    relations: FamilyAttributesInsert[],
  ): Promise<FamilyAttributesSelect[]> {
    return this.txHost.tx
      .insert(familyAttributes)
      .values(relations)
      .returning();
  }
}
