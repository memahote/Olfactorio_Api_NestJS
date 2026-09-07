import { Injectable } from '@nestjs/common';
import { ComparisonNoteInsert } from './_utils/types/comparison-notes.types';
import { ComparisonNotesRepository } from './comparison_notes.repository';

@Injectable()
export class ComparisonNotesService {
  constructor(
    private readonly comparisonNotesRepository: ComparisonNotesRepository,
  ) {}

  async createMany(relations: ComparisonNoteInsert[]) {
    return this.comparisonNotesRepository.createMany(relations);
  }
}
