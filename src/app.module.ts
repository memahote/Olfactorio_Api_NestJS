import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { OlfactiveFamiliesModule } from './olfactive-family/olfactive-families.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AttributesModule } from './attributes/attributes.module';
import { FamilyAttributesModule } from './family-attributes/family-attributes.module';
import { ImpressionsModule } from './impressions/impressions.module';
import { FeelingsModule } from './feelings/feelings.module';
import { AtmospheresModule } from './atmospheres/atmospheres.module';
import { NotesModule } from './notes/notes.module';
import { ExploredFamiliesModule } from './explored_families/explored_families.module';
import { ExploredNotesModule } from './explored_notes/explored_notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    RolesModule,
    AuthModule,
    FilesModule,
    OlfactiveFamiliesModule,
    NestjsFormDataModule.config({ isGlobal: true, storage: MemoryStoredFile }),
    AttributesModule,
    FamilyAttributesModule,
    ImpressionsModule,
    FeelingsModule,
    AtmospheresModule,
    NotesModule,
    ExploredFamiliesModule,
    ExploredNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
