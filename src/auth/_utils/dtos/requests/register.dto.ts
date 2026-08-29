import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { StrongPasswordDecorator } from 'src/users/_utils/decorators/strong-password.decorator';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, [
  'roleId',
  'hashedpassword',
]) {
  @ApiProperty({
    description: 'User password',
    example: 'MyStrongPassword123!',
  })
  @IsNotEmpty()
  @IsString()
  @StrongPasswordDecorator()
  password: string;

  @ApiProperty({
    description: 'Password confirmation',
    example: 'MyStrongPassword123!',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
