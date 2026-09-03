import { Injectable } from '@nestjs/common';
import { ExploredNotesRepository } from './explored_notes.repository';

@Injectable()
export class ExploredNotesService {
  constructor(
    private readonly ExploredNotesRepository: ExploredNotesRepository,
  ) {}

  async markAsExplored(userId: string, noteId: string) {
    return this.ExploredNotesRepository.create(userId, noteId);
  }
}
