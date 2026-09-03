import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NotesRepository } from './notes.repository';
import { NotesMapper } from './notes.mapper';
import { FilesModule } from 'src/files/files.module';
import { ExploredFamiliesModule } from 'src/explored_families/explored_families.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, NotesMapper],
  imports: [DatabaseModule, FilesModule, ExploredFamiliesModule]
})
export class NotesModule {}
