import { ApiProperty } from '@nestjs/swagger';

export class GeneratedTokensDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Expiration date of the tokens',
    example: '2026-08-30T12:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  expiresAt: Date;
}