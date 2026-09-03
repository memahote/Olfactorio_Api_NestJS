import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { olfactiveFamilies } from './olfactive-families.schema';
import { familyAttributes } from 'src/family-attributes/family-attributes.schema';
import { attributes } from 'src/attributes/attributes.schema';
import { files } from 'src/files/files.schema';
import { AttributeSelect } from 'src/attributes/_utils/types/attributes.types';
import {
  OlfactiveFamilyInsert,
  OlfactiveFamilyWithAttributesAndFile,
} from './_utils/types/create-olfactive-family.types';

@Injectable()
export class OlfactiveFamiliesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createWithAttributes(
    familyData: OlfactiveFamilyInsert,
    attributeIds: string[],
  ) {
    return this.databaseService.db.transaction(async (tx) => {
      const [olfactiveFamily] = await tx
        .insert(olfactiveFamilies)
        .values(familyData)
        .returning();

      await tx.insert(familyAttributes).values(
        attributeIds.map((attributeId) => ({
          familyId: olfactiveFamily.id,
          attributeId,
        })),
      );

      const rows = await tx
        .select({
          family: olfactiveFamilies,
          attribute: attributes,
        })
        .from(olfactiveFamilies)
        .innerJoin(
          familyAttributes,
          eq(familyAttributes.familyId, olfactiveFamilies.id),
        )
        .innerJoin(attributes, eq(attributes.id, familyAttributes.attributeId))
        .where(eq(olfactiveFamilies.id, olfactiveFamily.id));

      return {
        family: rows[0].family,
        attributes: rows.map((row) => row.attribute),
      };
    });
  }

  async findAllWithAttributes(): Promise<
    OlfactiveFamilyWithAttributesAndFile[]
  > {
    return this.databaseService.db
      .select({
        id: olfactiveFamilies.id,
        name: olfactiveFamilies.name,
        description: olfactiveFamilies.description,
        primaryColor: olfactiveFamilies.primaryColor,
        secondaryColor: olfactiveFamilies.secondaryColor,
        file: files,
        attributes: sql<AttributeSelect[]>`
        json_agg(${attributes})
      `,
      })
      .from(olfactiveFamilies)
      .innerJoin(files, eq(olfactiveFamilies.fileId, files.id))
      .innerJoin(
        familyAttributes,
        eq(familyAttributes.familyId, olfactiveFamilies.id),
      )
      .innerJoin(attributes, eq(attributes.id, familyAttributes.attributeId))
      .groupBy(olfactiveFamilies.id, files.id);
  }

  async findByIdWithAttributes(
    id: string,
  ): Promise<OlfactiveFamilyWithAttributesAndFile> {
    const [family] = await this.databaseService.db
      .select({
        id: olfactiveFamilies.id,
        name: olfactiveFamilies.name,
        description: olfactiveFamilies.description,
        primaryColor: olfactiveFamilies.primaryColor,
        secondaryColor: olfactiveFamilies.secondaryColor,
        file: files,
        attributes: sql<AttributeSelect[]>`
        json_agg(${attributes})
      `,
      })
      .from(olfactiveFamilies)
      .innerJoin(files, eq(olfactiveFamilies.fileId, files.id))
      .innerJoin(
        familyAttributes,
        eq(familyAttributes.familyId, olfactiveFamilies.id),
      )
      .innerJoin(attributes, eq(attributes.id, familyAttributes.attributeId))
      .where(eq(olfactiveFamilies.id, id))
      .groupBy(olfactiveFamilies.id, files.id);

    return family;
  }

  async findByName(name: string) {
    const [olfactiveFamily] = await this.databaseService.db
      .select()
      .from(olfactiveFamilies)
      .where(eq(olfactiveFamilies.name, name));

    return olfactiveFamily;
  }

  async findById(id: string) {
    const [olfactiveFamily] = await this.databaseService.db
      .select()
      .from(olfactiveFamilies)
      .where(eq(olfactiveFamilies.id, id));

    return olfactiveFamily;
  }

  async delete(id: string) {
    const [olfactiveFamily] = await this.databaseService.db
      .delete(olfactiveFamilies)
      .where(eq(olfactiveFamilies.id, id))
      .returning();

    return olfactiveFamily;
  }
}
