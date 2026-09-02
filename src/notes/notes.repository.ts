import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateNote } from './_utils/types/notes.types';

@Injectable()
export class NotesRepository {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }
  
  async create(createNote: CreateNote ) {

  }
}