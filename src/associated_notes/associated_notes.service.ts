import { Injectable } from '@nestjs/common';
import { AssociatedNotesRepository } from './associated_notes.repository';
import { Exceptions } from 'src/_utils/exceptions/exceptions';

@Injectable()
export class AssociatedNotesService {
  constructor(
    private readonly associatedNoteRepository: AssociatedNotesRepository,
  ) {}

  async associateMany(noteId: string, associatedNoteIds: string[]) {
    if (associatedNoteIds.includes(noteId)) {
      throw Exceptions.BAD_REQUEST(', a note cannot be associated with itself');
    }

    const relations = associatedNoteIds.map((associatedNoteId) => ({
      noteId,
      associatedNoteId,
    }));

    return this.associatedNoteRepository.createMany(relations);
  }
}
