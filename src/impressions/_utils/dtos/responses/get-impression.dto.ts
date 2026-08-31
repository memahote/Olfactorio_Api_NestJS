import { ApiProperty } from '@nestjs/swagger';

export class GetImpressionDto {
  @ApiProperty({
    description: 'Impression identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'The impression description',
    example: 'A sense of calm',
  })
  description: string;
}
