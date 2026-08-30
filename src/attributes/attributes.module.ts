import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AttributesRepository } from './attributes.repository';

@Module({
  controllers: [AttributesController],
  providers: [AttributesService, AttributesRepository],
  imports: [DatabaseModule]
})
export class AttributesModule {}
