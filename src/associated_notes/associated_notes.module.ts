import { Module } from '@nestjs/common';
import { AssociatedNotesService } from './associated_notes.service';
import { AssociatedNotesRepository } from './associated_notes.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [AssociatedNotesService, AssociatedNotesRepository],
  imports: [DatabaseModule],
  exports: [AssociatedNotesService]
})
export class AssociatedNotesModule {}
