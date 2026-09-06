import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';
import { ComparisonRepository } from './comparison.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ComparisonController],
  providers: [ComparisonService, ComparisonRepository],
  imports: [DatabaseModule]
})
export class ComparisonModule {}
