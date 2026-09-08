import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ComparisonValues } from '../../types/comparison.types';
import { ComparisonEnum } from '../../enums/comparison.enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComparisonDto {
  @ApiProperty({
    description: 'Comparison type',
    example: 'NOTE',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ComparisonEnum)
  type: ComparisonValues;

  @ApiProperty({
    description: 'Array of comparated notes id',
    example: 'NOTE',
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  noteIds: string[];
}
