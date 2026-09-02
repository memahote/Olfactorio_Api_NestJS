import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { OlfactiveFamiliesService } from './olfactive-families.service';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetOlfactiveFamilyDto } from './_utils/dtos/responses/get-olfactive-family.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';

@ApiTags('Olfactive Families')
@Controller('olfactive-family')
export class OlfactiveFamiliesController {
  constructor(
    private readonly olfactiveFamiliesService: OlfactiveFamiliesService,
  ) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Woody',
        },
        description: {
          type: 'string',
          example: 'A warm and woody olfactive family.',
        },
        primaryColor: {
          type: 'string',
          example: '#8B4513',
        },
        secondaryColor: {
          type: 'string',
          example: '#D2691E',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: [
        'name',
        'description',
        'primaryColor',
        'secondaryColor',
        'image',
      ],
    },
  })
  @ApiOperation({
    summary: 'Create an olfactive family',
  })
  @ApiCreatedResponse({
    description: 'Olfactive family successfully created',
    type: GetOlfactiveFamilyDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid olfactive family data or image',
  })
  @ApiConflictResponse({
    description: 'Olfactive family already exist',
  })
  create(@Body() createOlfactiveFamilyDto: CreateOlfactiveFamilyDto) {
    return this.olfactiveFamiliesService.createOlfactiveFamily(
      createOlfactiveFamilyDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all olfactive families',
  })
  @ApiOkResponse({
    description: 'Olfactive families successfully retrieved',
    type: GetOlfactiveFamilyDto,
    isArray: true,
  })
  async getOlfactiveFamilies() {
    return this.olfactiveFamiliesService.getOlfactiveFamilies();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an olfactive family by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Olfactive family unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Olfactive family successfully retrieved',
    type: GetOlfactiveFamilyDto,
  })
  @ApiNotFoundResponse({
    description: 'Olfactive family not found',
  })
  async getOlfactiveFamilyById(@Param('id', ParseUUIDPipe) id: string) {
    return this.olfactiveFamiliesService.getOlfactiveFamilyById(id);
  }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: 'Delete an olfactive family',
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: 'Olfactive family unique identifier',
  //   example: '550e8400-e29b-41d4-a716-446655440000',
  // })
  // @ApiOkResponse({
  //   description: 'Olfactive family successfully deleted',
  //   type: GetOlfactiveFamilyDto,
  // })
  // @ApiNotFoundResponse({
  //   description: 'Olfactive family not found',
  // })
  // async deleteOlfactiveFamily(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.olfactiveFamiliesService.deleteOlfactiveFamily(id);
  // }
}
