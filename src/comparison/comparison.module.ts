import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';
import { ComparisonRepository } from './comparison.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ComparisonNotesModule } from 'src/comparison_notes/comparison_notes.module';
import { ComparisonMapper } from './comparison.mapper';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  controllers: [ComparisonController],
  providers: [ComparisonService, ComparisonRepository, ComparisonMapper],
  imports: [DatabaseModule, ComparisonNotesModule, NotesModule]
})
export class ComparisonModule {}
