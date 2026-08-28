import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleType } from '../../types/role.type'; 
import { RoleEnum } from '../../enums/role.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  name: RoleType;
}
