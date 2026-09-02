import { Injectable } from '@nestjs/common';
import { NoteResponseDto } from './_utils/dtos/responses/note-response.dto';
import { NoteInsert, NoteSelect } from './_utils/types/notes.types';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';
import { FileSelect } from 'src/files/_utils/types/files.types';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class NotesMapper {
  constructor(private readonly filesService: FilesService) {}

  toNoteInsert = (note: CreateNoteDto, fileId: string): NoteInsert => ({
    name: note.name,
    olfactiveDescription: note.olfactiveDescription,
    educationalDescription: note.educationalDescription,
    pyramidLevel: note.pyramidLevel,
    pyramidDescription: note.pyramidDescription,
    familyId: note.familyId,
    parentNoteId: note.parentNoteId,
    fileId: fileId,
  });

  toResponse = (note: NoteSelect, file: FileSelect): NoteResponseDto => ({
    id: note.id,
    name: note.name,
    olfactiveDescription: note.olfactiveDescription,
    educationalDescription: note.educationalDescription,
    imageUrl: this.filesService.buildPublicUrl(file),
    pyramidLevel: note.pyramidLevel,
    pyramidDescription: note.pyramidDescription,
  });
}
