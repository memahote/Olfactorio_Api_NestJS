import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NotesRepository } from 'src/notes/notes.repository';
import { ComparisonRepository } from './comparison.repository';
import { ComparisonEnum } from './_utils/enums/comparison.enums';
import { ComparisonNotesService } from 'src/comparison_notes/comparison_notes.service';
import { CreateComparisonDto } from './_utils/dtos/requests/create-comparison.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { ComparisonMapper } from './comparison.mapper';
import { ComparisonValues } from './_utils/types/comparison.types';
import { NoteInsert } from 'src/notes/_utils/types/notes.types';

@Injectable()
export class ComparisonService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly comparisonRepository: ComparisonRepository,
    private readonly comparisonNotesService: ComparisonNotesService,
    private readonly notesRepository: NotesRepository,
    private readonly comparisonMapper: ComparisonMapper,
  ) {}

  async create(userId: string, comparisonData: CreateComparisonDto) {
    const noteA = await this.notesRepository.findNoteById(
      comparisonData.noteIds[0],
    );
    const noteB = await this.notesRepository.findNoteById(
      comparisonData.noteIds[1],
    );

    if (noteA || noteB) {
      throw Exceptions.NOT_FOUND('One or more notes');
    }

    this.validateComparison(comparisonData.type, noteA, noteB);

    return this.databaseService.db.transaction(async (tx) => {
      const createdComparison = await this.comparisonRepository.create(
        this.comparisonMapper.toComparisonInsert(userId, comparisonData.type),
        tx,
      );

      await this.comparisonNotesService.createMany(
        comparisonData.noteIds.map((noteId) => ({
          comparisonId: createdComparison.id,
          noteId,
        })),
        tx,
      );

      return createdComparison;
    });
  }

  async findAll(userId: string) {
    return this.comparisonRepository.findAll(userId);
  }

  async findById(comparisonId: string, userId: string) {
    const foundComparison = await this.comparisonRepository.findById(
      comparisonId,
      userId,
    );

    if (!foundComparison) {
      throw Exceptions.NOT_FOUND('Comparison');
    }

    return foundComparison;
  }

  async delete(comparisonId: string, userId: string) {
    const deletedComparison = await this.comparisonRepository.delete(
      comparisonId,
      userId,
    );

    if (!deletedComparison) {
      throw Exceptions.NOT_FOUND('Comparison');
    }

    return deletedComparison;
  }

  private validateComparison(
    type: ComparisonValues,
    noteA: NoteInsert,
    noteB: NoteInsert,
  ) {
    if (type === ComparisonEnum.NOTE) {
      if (noteA.parentNoteId !== null || noteB.parentNoteId !== null) {
        throw Exceptions.BAD_REQUEST('note');
      }

      if (noteA.familyId !== noteB.familyId) {
        throw Exceptions.BAD_REQUEST('note');
      }

      return;
    }

    if (type === ComparisonEnum.VARIATION) {
      if (noteA.parentNoteId === null || noteB.parentNoteId === null) {
        throw Exceptions.BAD_REQUEST('variation');
      }

      if (noteA.parentNoteId !== noteB.parentNoteId) {
        throw Exceptions.BAD_REQUEST('variation');
      }

      return;
    }

    throw Exceptions.BAD_REQUEST('comparison');
  }
}
