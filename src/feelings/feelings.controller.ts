import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { FeelingsService } from './feelings.service';
import { CreateFeelingDto } from './_utils/dtos/requests/create-feeling.dto';
import { GetFeelingDto } from './_utils/dtos/responses/get-feeling.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';

@ApiTags('Feelings')
@Controller('feelings')
export class FeelingsController {
  constructor(private readonly feelingsService: FeelingsService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Create a feeling',
  })
  @ApiCreatedResponse({
    description: 'The feeling has been successfully created.',
    type: GetFeelingDto,
  })
  @ApiConflictResponse({
    description: 'The feeling already exists for this user.',
  })
  async create(@Body() feelingDto: CreateFeelingDto): Promise<GetFeelingDto> {
    return this.feelingsService.create(feelingDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all feelings',
  })
  @ApiOkResponse({
    description: 'List of feelings.',
    type: GetFeelingDto,
    isArray: true,
  })
  async findAll(): Promise<GetFeelingDto[]> {
    return this.feelingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a feeling by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the feeling',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'The requested feeling.',
    type: GetFeelingDto,
  })
  @ApiNotFoundResponse({
    description: 'Feeling not found.',
  })
  async findById(@Param('id') id: string): Promise<GetFeelingDto> {
    return this.feelingsService.findById(id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Delete a feeling',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the feeling',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'The feeling has been successfully deleted.',
    type: GetFeelingDto,
  })
  @ApiNotFoundResponse({
    description: 'Feeling not found.',
  })
  async delete(@Param('id') id: string): Promise<GetFeelingDto> {
    return this.feelingsService.delete(id);
  }
}
