import { Module } from '@nestjs/common';
import { NoteAttributesService } from './note_attributes.service';
import { DatabaseModule } from 'src/database/database.module';
import { NoteAttributesRepository } from './note_attributes.repository';

@Module({
  providers: [NoteAttributesService, NoteAttributesRepository],
  imports: [DatabaseModule],
  exports: [NoteAttributesService]
})
export class NoteAttributesModule {}
