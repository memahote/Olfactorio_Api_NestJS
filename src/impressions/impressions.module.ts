import { Module } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { ImpressionsController } from './impressions.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ImpressionsRepository } from './impressions.repository';

@Module({
  controllers: [ImpressionsController],
  providers: [ImpressionsService, ImpressionsRepository],
  imports: [DatabaseModule]
})
export class ImpressionsModule {}
