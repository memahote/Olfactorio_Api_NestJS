import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesProvider } from './files.provider';
import { FilesMapper } from './files.mapper';

@Module({
  providers: [FilesService, FilesMapper, ...FilesProvider],
  exports: [FilesService]
})
export class FilesModule {}
