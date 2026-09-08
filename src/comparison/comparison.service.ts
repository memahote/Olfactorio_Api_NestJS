import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ComparisonRepository } from './comparison.repository';
import { ComparisonEnum } from './_utils/enums/comparison.enums';
import { ComparisonNotesService } from 'src/comparison_notes/comparison_notes.service';
import { CreateComparisonDto } from './_utils/dtos/requests/create-comparison.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { ComparisonMapper } from './comparison.mapper';
import { ComparisonValues } from './_utils/types/comparison.types';
import { NoteInsert } from 'src/notes/_utils/types/notes.types';
import { NotesService } from 'src/notes/notes.service';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class ComparisonService {
  constructor(
    private readonly comparisonRepository: ComparisonRepository,
    private readonly comparisonNotesService: ComparisonNotesService,
    private readonly notesService: NotesService,
    private readonly comparisonMapper: ComparisonMapper,
  ) {}

  @Transactional()
  async create(userId: string, comparisonDto: CreateComparisonDto) {
    const noteA = await this.notesService.findNoteById(
      comparisonDto.noteIds[0],
    );
    const noteB = await this.notesService.findNoteById(
      comparisonDto.noteIds[1],
    );

    if (!noteA || !noteB) {
      throw Exceptions.NOT_FOUND('One or more notes');
    }

    this.validateComparison(comparisonDto.type, noteA.notes, noteB.notes);

    const createdComparison = await this.comparisonRepository.create(
      this.comparisonMapper.toComparisonInsert(userId, comparisonDto.type),
    );

    await this.comparisonNotesService.createMany(
      comparisonDto.noteIds.map((noteId) => ({
        comparisonId: createdComparison.id,
        noteId,
      })),
    );

    return this.comparisonMapper.toGetComparisonDto(createdComparison);
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
