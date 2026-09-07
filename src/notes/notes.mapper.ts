import { Injectable } from '@nestjs/common';
import { NoteResponseDto } from './_utils/dtos/responses/note-response.dto';
import { NoteInsert, NoteSelect } from './_utils/types/notes.types';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';
import { FileSelect } from 'src/files/_utils/types/files.types';
import { FilesService } from 'src/files/files.service';
import { AttributeSelect } from 'src/attributes/_utils/types/attributes.types';
import { ImpressionSelect } from 'src/impressions/_utils/types/impressions.type';
import { NoteLightResponseDto } from './_utils/dtos/responses/note-light-response.dto';

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

  toResponse = (
    note: NoteSelect,
    file: FileSelect,
    attributes?: AttributeSelect[],
    impressions?: ImpressionSelect[],
    associatedNotes?: NoteLightResponseDto,
  ): NoteResponseDto => ({
    id: note.id,
    name: note.name,
    olfactiveDescription: note.olfactiveDescription,
    educationalDescription: note.educationalDescription,
    imageUrl: this.filesService.buildPublicUrl(file),
    pyramidLevel: note.pyramidLevel,
    pyramidDescription: note.pyramidDescription,
    attributes,
    impressions,
    associatedNotes
  });

  toLightResponse = (
    note: NoteSelect,
    file: FileSelect,
    attributes: AttributeSelect[],
  ): NoteLightResponseDto => ({
    id: note.id,
    name: note.name,
    imageUrl: this.filesService.buildPublicUrl(file),
    attributes: attributes,
  });
}
