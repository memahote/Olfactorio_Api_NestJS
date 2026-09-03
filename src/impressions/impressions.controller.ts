import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ImpressionsService } from './impressions.service';
import { CreateImpressionDto } from './_utils/dtos/requests/create-impression.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';

@ApiTags('Impressions')
@Controller('impressions')
export class ImpressionsController {
  constructor(private readonly impressionsService: ImpressionsService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Create an impression',
    description: 'Creates a new impression.',
  })
  @ApiCreatedResponse({
    description: 'The impression has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'The provided data is invalid.',
  })
  @ApiConflictResponse({
    description: 'An impression with this description already exists.',
  })
  async create(@Body() impression: CreateImpressionDto) {
    return this.impressionsService.create(impression);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all impressions',
    description: 'Retrieves all available impressions.',
  })
  @ApiOkResponse({
    description: 'The impressions have been successfully retrieved.',
  })
  async findAll() {
    return this.impressionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an impression by ID',
    description: 'Retrieves a single impression using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the impression.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'The impression has been successfully retrieved.',
  })
  @ApiBadRequestResponse({
    description: 'The provided ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'The impression was not found.',
  })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.impressionsService.findById(id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Delete an impression',
    description: 'Deletes an impression using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the impression.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'The impression has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'The provided ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'The impression was not found.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.impressionsService.delete(id);
  }
}
