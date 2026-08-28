import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, [
  'roleId',
  'hashedpassword',
]) {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
