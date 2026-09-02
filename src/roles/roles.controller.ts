import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './utils/dtos/requests/create-role.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetRoleDto } from './utils/dtos/responses/get-role.dto';
import { Public } from 'src/_utils/decorators/public.decorator';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from './utils/enums/role.enum';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Create a role',
  })
  @ApiCreatedResponse({
    description: 'Role successfully created',
    type: GetRoleDto,
  })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Get all roles',
  })
  @ApiOkResponse({
    description: 'Roles successfully retrieved',
    type: GetRoleDto,
    isArray: true,
  })
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Delete a role',
  })
  @ApiParam({
    name: 'id',
    description: 'Role unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiNoContentResponse({
    description: 'Role successfully deleted',
  })
  deleteRole(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
