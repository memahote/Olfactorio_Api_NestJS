import { ApiProperty } from '@nestjs/swagger';

export class GetFeelingDto {
  @ApiProperty({
    description: 'Unique identifier of the feeling',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the feeling',
    example: 'Serenity',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the user associated with this feeling',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  userId: string;
}