import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';
import { NotesRepository } from './notes.repository';
import { NoteResponseDto } from './_utils/dtos/responses/note-response.dto';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository
  ) { }
  
  async createNote(createNoteDto: CreateNoteDto): Promise<NoteResponseDto>{
    
  }
}
