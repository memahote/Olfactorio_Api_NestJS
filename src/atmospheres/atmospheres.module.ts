import { Module } from '@nestjs/common';
import { AtmospheresService } from './atmospheres.service';
import { AtmospheresController } from './atmospheres.controller';
import { AtmospheresRepository } from './atmospheres.repository';
import { DatabaseModule } from 'src/database/database.module';
import { AtmospheresMapper } from './atmospheres.mapper';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AtmospheresController],
  providers: [AtmospheresService, AtmospheresRepository, AtmospheresMapper],
  imports: [DatabaseModule, FilesModule]
})
export class AtmospheresModule {}
