import { PickType } from '@nestjs/swagger';
import { GetNoteDto } from './note-response.dto';

export class NoteLightDto extends PickType(GetNoteDto, [
  'id',
  'name',
  'imageUrl',
  'attributes'
] as const) {}
