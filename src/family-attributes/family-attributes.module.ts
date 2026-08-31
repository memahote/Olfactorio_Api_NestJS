import { Module } from '@nestjs/common';
import { FamilyAttributesService } from './family-attributes.service';
import { FamilyAttributesController } from './family-attributes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FamilyAttributesRepository } from './family-attributes.repository';

@Module({
  controllers: [FamilyAttributesController],
  providers: [FamilyAttributesService, FamilyAttributesRepository],
  imports: [DatabaseModule],
  exports: [FamilyAttributesService]
})
export class FamilyAttributesModule {}
