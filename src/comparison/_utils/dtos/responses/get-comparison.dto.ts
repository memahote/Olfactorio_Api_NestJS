import { ApiProperty } from '@nestjs/swagger';
import { ComparisonValues } from '../../types/comparison.types';
import { ComparisonEnum } from '../../enums/comparison.enums';

export class GetComparisonDto {
  @ApiProperty({
    description: 'Unique identifier of the comparison.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Date when the comparison was created.',
    example: '2026-09-08T12:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Type of the comparison.',
    enum: ComparisonEnum,
    example: ComparisonEnum.NOTE,
  })
  type: ComparisonValues;

  @ApiProperty({
    description: 'Unique identifier of the user who created the comparison.',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  userId: string;
}
