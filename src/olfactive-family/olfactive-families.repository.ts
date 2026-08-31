import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { olfactiveFamilies } from './olfactive-families.schema';
import { familyAttributes } from 'src/family-attributes/family-attributes.schema';
import { attributes } from 'src/attributes/attributes.schema';
import { CreatedOlfactiveFamilies } from './_utils/types/create-olfactive-family.types';

@Injectable()
export class OlfactiveFamiliesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createWithAttributes(
    familyData: CreatedOlfactiveFamilies,
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

  async findAllWithAttributes() {
    const rows = await this.databaseService.db
      .select({
        family: olfactiveFamilies,
        attribute: attributes,
      })
      .from(olfactiveFamilies)
      .innerJoin(
        familyAttributes,
        eq(familyAttributes.familyId, olfactiveFamilies.id),
      )
      .innerJoin(attributes, eq(attributes.id, familyAttributes.attributeId));

    const families = new Map<
      string,
      {
        family: typeof olfactiveFamilies.$inferSelect;
        attributes: (typeof attributes.$inferSelect)[];
      }
    >();

    for (const row of rows) {
      if (!families.has(row.family.id)) {
        families.set(row.family.id, {
          family: row.family,
          attributes: [],
        });
      }

      families.get(row.family.id)!.attributes.push(row.attribute);
    }

    return Array.from(families.values());
  }

  async findByIdWithAttributes(id: string) {
    return this.databaseService.db
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
      .where(eq(olfactiveFamilies.id, id));
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
