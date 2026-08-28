import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './utils/dtos/requests/create-role.dto';
import { Public } from 'src/_utils/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
