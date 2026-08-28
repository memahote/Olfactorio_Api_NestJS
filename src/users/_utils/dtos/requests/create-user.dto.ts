import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StrongPasswordDecorator } from '../../decorators/strong-password.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @StrongPasswordDecorator()
  hashedpassword: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}
