import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RolesRepository } from './roles.repository';

@Module({
  providers: [RolesService, RolesRepository],
  controllers: [RolesController],
  imports: [DatabaseModule],
  exports: [RolesService]
})
export class RolesModule {}
