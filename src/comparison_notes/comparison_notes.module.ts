import { Module } from '@nestjs/common';
import { ComparisonNotesService } from './comparison_notes.service';
import { DatabaseModule } from 'src/database/database.module';
import { ComparisonNotesRepository } from './comparison_notes.repository';

@Module({
  providers: [ComparisonNotesService, ComparisonNotesRepository],
  imports: [DatabaseModule]
})
export class ComparisonNotesModule {}
