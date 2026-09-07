import { Module } from '@nestjs/common';
import { FamilyAttributesService } from './family_attributes.service';
import { DatabaseModule } from 'src/database/database.module';
import { FamilyAttributesRepository } from './family_attributes.repository';

@Module({
  providers: [FamilyAttributesService, FamilyAttributesRepository],
  imports: [DatabaseModule],
  exports: [FamilyAttributesService],
})
export class FamilyAttributesModule {}
