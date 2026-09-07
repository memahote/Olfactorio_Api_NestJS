import { Body, Controller, Post } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiConsumes } from '@nestjs/swagger';
import { CurrentUser } from 'src/_utils/decorators/currentUser.decorator';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';
import { CreateComparisonDto } from './_utils/dtos/requests/create-comparison.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  compare(@CurrentUser() user: GetUserDto, @Body() compareNoteDto: CreateComparisonDto) {
    return this.comparisonService.create(user.id, compareNoteDto)
  }
}
