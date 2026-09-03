import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';
import { NotesRepository } from './notes.repository';
import { NoteResponseDto } from './_utils/dtos/responses/note-response.dto';
import { FilesService } from 'src/files/files.service';
import { NotesMapper } from './notes.mapper';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import {
  FilesDirectoryEnum,
  FilesDirectoryPrivacyEnum,
} from 'src/files/_utils/enums/files.enums';
import { ExploredFamiliesService } from 'src/explored_families/explored_families.service';
import { ExploredNotesService } from 'src/explored_notes/explored_notes.service';
import { FavoriteNotesService } from 'src/favorite_notes/favorite_notes.service';
import { NoteAttributesService } from 'src/note_attributes/note_attributes.service';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly filesService: FilesService,
    private readonly notesMapper: NotesMapper,
    private readonly exploredFamiliesService: ExploredFamiliesService,
    private readonly exploredNotesService: ExploredNotesService,
    private readonly favoriteNotesService: FavoriteNotesService,
    private readonly noteAttributesService: NoteAttributesService
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<NoteResponseDto> {
    const existingNote = await this.notesRepository.findByNameAndFamily(
      createNoteDto.name,
      createNoteDto.familyId,
    );

    if (existingNote) {
      throw Exceptions.ALREADY_EXIST('This note in this family');
    }

    const file = await this.filesService.uploadFile(
      createNoteDto.image,
      FilesDirectoryPrivacyEnum.PUBLIC,
      FilesDirectoryEnum.NOTES,
    );

    try {
      const note = await this.notesRepository.create(
        this.notesMapper.toNoteInsert(createNoteDto, file.id),
      );

      await this.noteAttributesService.addAttributes(
      note.id,
        createNoteDto.attributeIds,
    );

      const attributes = await this.noteAttributesService.findByNoteId(note.id)
      return this.notesMapper.toResponse(note, file, attributes);
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async findNoteById(noteId: string, userId: string): Promise<NoteResponseDto> {
    const note = await this.notesRepository.findNoteById(noteId);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    await this.exploredNotesService.markAsExplored(userId, noteId);

    return this.notesMapper.toResponse(note.note, note.file, note.attributes);
  }

  async findNoteVariations(noteId: string): Promise<NoteResponseDto[]> {
    const note = await this.notesRepository.findNoteById(noteId);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    const notes = await this.notesRepository.findNoteVariations(noteId);

    return notes.map((note) =>
      this.notesMapper.toResponse(note.note, note.file, note.attributes),
    );
  }

  async findNotesByFamilyId(
    familyId: string,
    userId: string,
  ): Promise<NoteResponseDto[]> {
    const notes = await this.notesRepository.findNotesByFamilyId(familyId);

    if (notes.length === 0) {
      throw Exceptions.NOT_FOUND('Notes');
    }

    await this.exploredFamiliesService.markAsExplored(userId, familyId);

    return notes.map((note) =>
      this.notesMapper.toResponse(note.note, note.file, note.attributes),
    );
  }

  async addToFavorite(userId: string, noteId: string) {
    const note = await this.notesRepository.findNoteById(noteId);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    return this.favoriteNotesService.addToFavorite(userId, noteId);
  }

  async unfavorite(userId: string, noteId: string) {
    const note = await this.notesRepository.findNoteById(noteId);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    return this.favoriteNotesService.unfavorite(userId, noteId);
  }

  async deleteNote(id: string) {
    const note = await this.notesRepository.findNoteById(id);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    await this.notesRepository.deleteNote(id);

    await this.filesService.deleteFile(note.file);
  }
}
