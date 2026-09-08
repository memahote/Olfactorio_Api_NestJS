import { Body, Controller, Post } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { FormDataRequest } from 'nestjs-form-data';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/_utils/decorators/currentUser.decorator';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';
import { CreateComparisonDto } from './_utils/dtos/requests/create-comparison.dto';
import { GetComparisonDto } from './_utils/dtos/responses/get-comparison.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a comparison',
  })
  @ApiCreatedResponse({
    description: 'Comparison successfully created.',
    type: GetComparisonDto,
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  @ApiBadRequestResponse({
    description: 'Comparison not valid'
  })
  @ApiConflictResponse({
    description: 'Attribute with this name already exist.',
  })
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  compare(
    @CurrentUser() user: GetUserDto,
    @Body() compareNoteDto: CreateComparisonDto,
  ) {
    return this.comparisonService.create(user.id, compareNoteDto);
  }
}
