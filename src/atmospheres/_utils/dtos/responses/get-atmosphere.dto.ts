
import { ApiProperty } from '@nestjs/swagger';

export class GetAtmosphereDto {
  @ApiProperty({
    description: 'Unique identifier of the atmosphere',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the atmosphere',
    example: 'Fresh',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the user who owns the atmosphere',
    example: '550e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  ownerId: string | null;

  @ApiProperty({
    description: 'Public URL of the atmosphere image',
    example: 'https://example.com/images/atmosphere.jpg',
  })
  imageUrl: string;
}

