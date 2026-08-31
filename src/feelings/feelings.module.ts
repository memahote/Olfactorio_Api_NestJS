import { Module } from '@nestjs/common';
import { FeelingsService } from './feelings.service';
import { FeelingsController } from './feelings.controller';
import { FeelingsRepository } from './feelings.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FeelingsController],
  providers: [FeelingsService, FeelingsRepository],
  imports: [DatabaseModule]
})
export class FeelingsModule {}
