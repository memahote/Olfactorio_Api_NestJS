import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleType } from '../../types/role.type'; 
import { RoleEnum } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    enum: RoleEnum,
    example: RoleEnum.USER,
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  name: RoleType;
}
