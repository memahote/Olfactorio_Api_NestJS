import { Module } from '@nestjs/common';
import { FavoriteNotesService } from './favorite_notes.service';
import { DatabaseModule } from 'src/database/database.module';
import { FavoriteNotesRepository } from './favorite_notes.repository';

@Module({
  providers: [FavoriteNotesService, FavoriteNotesRepository],
  imports: [DatabaseModule],
  exports: [FavoriteNotesService]
})
export class FavoriteNotesModule {}
