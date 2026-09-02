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

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly filesService: FilesService,
    private readonly notesMapper: NotesMapper,
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

      return this.notesMapper.toResponse(note, file);
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async findNoteById(id: string): Promise<NoteResponseDto> {
    const note = await this.notesRepository.findNoteById(id);

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    return this.notesMapper.toResponse(note.note, note.file);
  }

  async findNoteVariations(noteId: string): Promise<NoteResponseDto[]> {
    const note = await this.notesRepository.findNoteById(noteId)

    if (!note) {
      throw Exceptions.NOT_FOUND('Note');
    }

    const notes = await this.notesRepository.findNoteVariations(noteId);

    return notes.map((note) =>
      this.notesMapper.toResponse(note.note, note.file),
    );
  }

  async findNotesByFamilyId(familyId: string): Promise<NoteResponseDto[]> {
    const notes = await this.notesRepository.findNotesByFamilyId(familyId);

    if (!notes) {
      throw Exceptions.NOT_FOUND('Notes');
    }

    return notes.map((note) =>
      this.notesMapper.toResponse(note.note, note.file),
    );
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
