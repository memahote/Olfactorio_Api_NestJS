import { Injectable } from '@nestjs/common';
import { NoteImpressionsRepository } from './note_impressions.repository';


@Injectable()
export class NoteImpressionsService {
  constructor(
    private readonly noteImpressionsRepository: NoteImpressionsRepository,
  ) {}

  async addImpressions(noteId: string, impressionIds: string[]) {
    const relations = impressionIds.map((impressionId) => ({
      noteId,
      impressionId,
    }));

    return this.noteImpressionsRepository.createMany(relations)
  }

  async findByNoteId(noteId: string) {
  return this.noteImpressionsRepository.findByNoteId(noteId);
}
}
