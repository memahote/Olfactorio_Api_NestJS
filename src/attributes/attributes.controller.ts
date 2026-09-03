import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './_utils/dtos/requests/create-attribute.dto';
import { GetAttributeDto } from './_utils/dtos/responses/get-attribute.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';

@ApiTags('Attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Create an attribute',
  })
  @ApiCreatedResponse({
    description: 'Attribute successfully created.',
    type: GetAttributeDto,
  })
  @ApiConflictResponse({
    description: 'Attribute with this name already exist.',
  })
  create(
    @Body() createAttributeDto: CreateAttributeDto,
  ): Promise<GetAttributeDto> {
    return this.attributesService.create(createAttributeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all attributes',
  })
  @ApiOkResponse({
    description: 'Attributes successfully retrieved.',
    type: GetAttributeDto,
    isArray: true,
  })
  findAll(): Promise<GetAttributeDto[]> {
    return this.attributesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an attribute by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Attribute UUID',
  })
  @ApiOkResponse({
    description: 'Attribute successfully retrieved.',
    type: GetAttributeDto,
  })
  @ApiNotFoundResponse({
    description: 'Attribute not found.',
  })
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<GetAttributeDto> {
    return this.attributesService.findById(id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Delete an attribute',
  })
  @ApiParam({
    name: 'id',
    description: 'Attribute UUID',
  })
  @ApiOkResponse({
    description: 'Attribute successfully deleted.',
    type: GetAttributeDto,
  })
  @ApiNotFoundResponse({
    description: 'Attribute not found.',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<GetAttributeDto> {
    return this.attributesService.delete(id);
  }
}
