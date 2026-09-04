import { PickType } from '@nestjs/swagger';
import { NoteResponseDto } from './note-response.dto';

export class NoteLightResponseDto extends PickType(NoteResponseDto, [
  'id',
  'name',
  'imageUrl',
  'attributes'
] as const) {}
