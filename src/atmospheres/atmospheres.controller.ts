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
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AtmospheresService } from './atmospheres.service';
import { CurrentUser } from 'src/_utils/decorators/currentUser.decorator';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';
import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';
import { FormDataRequest } from 'nestjs-form-data';

@ApiTags('Atmospheres')
@ApiBearerAuth()
@Controller('atmospheres')
export class AtmospheresController {
  constructor(private readonly atmospheresService: AtmospheresService) {}

  @Post('admin')
  @FormDataRequest()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Create a default atmosphere',
    description: 'Allows an administrator to create a new default atmosphere.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAtmosphereDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Default atmosphere created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access is restricted to administrators.',
  })
  createDefaultAtmosphere(@Body() dto: CreateAtmosphereDto) {
    return this.atmospheresService.createDefaultAtmosphere(dto);
  }

  @Get('admin/all')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Get all atmospheres',
    description: 'Allows an administrator to retrieve all atmospheres.',
  })
  @ApiResponse({
    status: 200,
    description: 'Atmospheres retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access is restricted to administrators.',
  })
  getAllAtmosphere() {
    return this.atmospheresService.findAllAtmosphere();
  }

  @Get('admin/default')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Get all default atmospheres',
    description: 'Allows an administrator to retrieve all default atmospheres.',
  })
  @ApiResponse({
    status: 200,
    description: 'Default atmospheres retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access is restricted to administrators.',
  })
  getDefaultAtmosphere() {
    return this.atmospheresService.findAllDefault();
  }

  @Delete('admin/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Delete a default atmosphere',
    description: 'Allows an administrator to delete a default atmosphere.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'UUID of the atmosphere to delete.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Default atmosphere deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access is restricted to administrators.',
  })
  @ApiResponse({
    status: 404,
    description: 'Atmosphere not found.',
  })
  deleteDefault(@Param('id', ParseUUIDPipe) id: string) {
    return this.atmospheresService.deleteDefault(id);
  }

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a personal atmosphere',
    description:
      'Allows the authenticated user to create a personal atmosphere.',
  })
  @ApiBody({
    type: CreateAtmosphereDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Personal atmosphere created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  create(@CurrentUser() user: GetUserDto, @Body() dto: CreateAtmosphereDto) {
    return this.atmospheresService.createPersonalAtmosphere(dto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get my atmospheres',
    description:
      'Returns all personal atmospheres belonging to the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Personal atmospheres retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  findAll(@CurrentUser() user: GetUserDto) {
    return this.atmospheresService.findAllUserAtmospheres(user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a personal atmosphere',
    description:
      'Allows the authenticated user to delete one of their personal atmospheres.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'UUID of the atmosphere to delete.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Atmosphere deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID.',
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: 403,
    description:
      'The user does not own this atmosphere or does not have the required permissions.',
  })
  @ApiResponse({
    status: 404,
    description: 'Atmosphere not found.',
  })
  delete(
    @CurrentUser() user: GetUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.atmospheresService.delete(id, user.id);
  }
}
