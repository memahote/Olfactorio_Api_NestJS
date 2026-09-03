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

  @Post('favorite/:id')
  addToFavorite(
    @CurrentUser() user: GetUserDto,
    @Param('id', ParseUUIDPipe) noteId: string,
  ) {
    return this.notesService.addToFavorite(user.id, noteId);
  }

  @Get(':id')
  getNoteDetails(
    @Param('id', ParseUUIDPipe) noteId: string,
    @CurrentUser() user: GetUserDto,
  ) {
    return this.notesService.findNoteById(noteId, user.id);
  }

  @Get('variations/:id')
  getNoteVariations(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findNoteVariations(id);
  }

  @Get('/family/:id')
  getNotesByFamilyId(
    @Param('id', ParseUUIDPipe) familyId: string,
    @CurrentUser() user: GetUserDto,
  ) {
    return this.notesService.findNotesByFamilyId(familyId, user.id);
  }

  @Delete('/favorite/:id')
  unfavorite(
    @CurrentUser() user: GetUserDto,
    @Param('id', ParseUUIDPipe) noteId: string,
  ) {
    return this.notesService.unfavorite(user.id, noteId);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  deleteNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteNote(id);
  }
}
