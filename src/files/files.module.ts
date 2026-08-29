import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesProvider } from './files.provider';
import { FilesMapper } from './files.mapper';
import { FilesRepository } from './files.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [FilesService, FilesMapper, FilesRepository, ...FilesProvider],
  exports: [FilesService],
  imports: [DatabaseModule]
})
export class FilesModule {}
