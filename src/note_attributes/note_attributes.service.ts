import { Injectable } from '@nestjs/common';
import { NoteAttributesRepository } from './note_attributes.repository';

@Injectable()
export class NoteAttributesService {
  constructor(
    private readonly noteAttributesRepository: NoteAttributesRepository,
  ) {}

  async addAttributes(noteId: string, attributeIds: string[]) {
    const relations = attributeIds.map((attributeId) => ({
      noteId,
      attributeId,
    }));
    return this.noteAttributesRepository.createMany(relations);
  }

  async findByNoteId(noteId: string) {
    return this.noteAttributesRepository.findByNoteId(noteId);
  }
}
