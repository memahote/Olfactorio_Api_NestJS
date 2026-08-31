import { Module } from '@nestjs/common';
import { OlfactiveFamiliesService } from './olfactive-families.service';
import { OlfactiveFamiliesController } from './olfactive-families.controller';
import { OlfactiveFamiliesMapper } from './olfactive-families.mapper';
import { OlfactiveFamiliesRepository } from './olfactive-families.repository';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';
import { FamilyAttributesModule } from 'src/family-attributes/family-attributes.module';

@Module({
  controllers: [OlfactiveFamiliesController],
  providers: [OlfactiveFamiliesService, OlfactiveFamiliesMapper, OlfactiveFamiliesRepository],
  imports: [DatabaseModule, FilesModule, FamilyAttributesModule]
})
export class OlfactiveFamiliesModule {}
