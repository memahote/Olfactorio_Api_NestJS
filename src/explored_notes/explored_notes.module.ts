import { Module } from '@nestjs/common';
import { ExploredNotesService } from './explored_notes.service';
import { DatabaseModule } from 'src/database/database.module';
import { ExploredNotesRepository } from './explored_notes.repository';

@Module({
  providers: [ExploredNotesService, ExploredNotesRepository],
  imports: [DatabaseModule],
  exports: [ExploredNotesService]
})
export class ExploredNotesModule {}
