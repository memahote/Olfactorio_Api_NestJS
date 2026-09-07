import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { noteAttributes } from './note_attributes.schema';
import { NoteAttributeInsert } from './_utils/types/note_attibutes.types';
import { attributes } from 'src/attributes/attributes.schema';
import { eq } from 'drizzle-orm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class NoteAttributesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) { }

  async createMany(relations: NoteAttributeInsert[]) {
    return this.txHost.tx
      .insert(noteAttributes)
      .values(relations)
      .returning()
      .onConflictDoNothing();
  }

  async findByNoteId(id: string) {
    return this.databaseService.db
      .select({
      id: attributes.id,
      name: attributes.name,
    })
      .from(noteAttributes)
      .innerJoin(attributes, eq(noteAttributes.attributeId, attributes.id))
      .where(eq(noteAttributes.noteId, id));
  }
}
