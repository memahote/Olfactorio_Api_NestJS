import { Module } from '@nestjs/common';
import { NoteImpressionsService } from './note_impressions.service';
import { DatabaseModule } from 'src/database/database.module';
import { NoteImpressionsRepository } from './note_impressions.repository';

@Module({
  providers: [NoteImpressionsService, NoteImpressionsRepository],
  imports: [DatabaseModule],
  exports: [NoteImpressionsService]
})
export class NoteImpressionsModule {}
