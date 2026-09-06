import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ComparisonNoteInsert } from './_utils/types/comparison-notes.types';
import { ComparisonNotesRepository } from './comparison_notes.repository';

@Injectable()
export class ComparisonNotesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly comparisonNotesRepository: ComparisonNotesRepository,
  ) {}

  async createMany(
    relations: ComparisonNoteInsert[],
    tx = this.databaseService.db,
  ) {
    return this.comparisonNotesRepository.createMany(relations, tx);
  }
}
