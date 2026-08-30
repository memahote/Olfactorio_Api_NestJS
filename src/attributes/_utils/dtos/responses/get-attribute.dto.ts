import { ApiProperty } from '@nestjs/swagger';

export class GetAttributeDto {
  @ApiProperty({
    description: 'Attribut identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the attribute',
    example: 'Fresh',
  })
  name: string;
}
