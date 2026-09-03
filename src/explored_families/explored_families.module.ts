import { Module } from '@nestjs/common';
import { ExploredFamiliesService } from './explored_families.service';
import { DatabaseModule } from 'src/database/database.module';
import { ExploredFamiliesRepository } from './explored_familes.repository';

@Module({
  providers: [ExploredFamiliesService, ExploredFamiliesRepository],
  imports: [DatabaseModule],
  exports: [ExploredFamiliesService]
})
export class ExploredFamiliesModule {}
