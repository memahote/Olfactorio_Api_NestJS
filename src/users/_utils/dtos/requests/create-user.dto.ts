import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StrongPasswordDecorator } from '../../decorators/strong-password.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hashed user password',
    example: '$2b$12$...',
  })
  @IsNotEmpty()
  @IsString()
  @StrongPasswordDecorator()
  hashedpassword: string;

  @ApiProperty({
    description: 'User role identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsString()
  roleId: string;
}
