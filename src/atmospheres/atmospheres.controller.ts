import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AtmospheresService } from './atmospheres.service';
import { CurrentUser } from 'src/_utils/decorators/currentUser.decorator';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';
import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { Roles } from 'src/_utils/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('atmospheres')
export class AtmospheresController {
  constructor(private readonly atmospheresService: AtmospheresService) {}

  @Post('admin')
  @FormDataRequest()
  @Roles(RoleEnum.ADMIN)
  createDefaultAtmosphere(@Body() dto: CreateAtmosphereDto) {
    return this.atmospheresService.createDefaultAtmosphere(dto);
  }

  // @Get('amdin')
  // @Roles(RoleEnum.ADMIN)
  // getDefaultAtmosphere() {

  // }

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  create(@CurrentUser() user: GetUserDto, @Body() dto: CreateAtmosphereDto) {
    return this.atmospheresService.createPersonalAtmosphere(dto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: GetUserDto) {
    return this.atmospheresService.findAll(user.id);
  }
}
