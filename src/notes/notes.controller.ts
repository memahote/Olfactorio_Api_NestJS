import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './_utils/dtos/requests/create-note.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';
import { FormDataRequest } from 'nestjs-form-data';
import { CurrentUser } from 'src/_utils/decorators/currentUser.decorator';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @FormDataRequest()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Get(':id')
  findNoteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findNoteById(id);
  }

  @Get('variations/:id')
  findNoteVariations(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findNoteVariations(id);
  }

  @Get('/family/:id')
  findNotesByFamilyId(@Param('id', ParseUUIDPipe) familyId: string, @CurrentUser() user: GetUserDto ) {
    return this.notesService.findNotesByFamilyId(familyId, user.id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  deleteNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteNote(id);
  }
}
