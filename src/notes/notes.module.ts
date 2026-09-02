import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NotesRepository } from './notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  imports: [DatabaseModule]
})
export class NotesModule {}
