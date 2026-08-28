import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';

@Module({
  controllers: [],
  providers: [HashingService],
  exports: [HashingService],
})
export class CryptographyModule {}
