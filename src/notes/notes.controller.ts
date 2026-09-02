import { Controller, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }
  
  @Post()
  createNote(createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }


  //GetNotesByFamilyId ->on recupere seulement les note d'une famille jamais toute les note existante

  //GetNoteById -> pour le detail de la note
  //GetNoteVariation -> toute les notes avec le meme parentID = variation de celle ci

}
