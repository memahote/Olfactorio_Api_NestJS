import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ComparisonValues } from '../../types/comparison.types';
import { ComparisonEnum } from '../../enums/comparison.enums';

export class CreateComparisonDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ComparisonEnum)
  type: ComparisonValues;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsUUID('4', { each: true })
  noteIds: string[];
}
