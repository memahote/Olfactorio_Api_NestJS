import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token used to obtain new authentication tokens',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
