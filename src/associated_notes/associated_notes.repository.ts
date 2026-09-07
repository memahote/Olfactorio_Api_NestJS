import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { associatedNotes } from './associated_notes.schema';
import { AssociatedNoteInsert } from './_utils/types/associated-notes.types';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class AssociatedNotesRepository {
  constructor(
    // private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) { }

  async createMany(relations: AssociatedNoteInsert[]) {
  return this.txHost.tx
    .insert(associatedNotes)
    .values(relations)
    .onConflictDoNothing()
    .returning();
}


}
