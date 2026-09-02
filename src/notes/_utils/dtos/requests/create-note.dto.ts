import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { NotePyramidLevelEnum } from '../../enums/note-pyramid-level.enum';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { NotePyramidLevelType } from '../../types/note-pyramid-level.type';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Jasmine',
    description: 'Name of the olfactive note.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'A rich, elegant, and sensual floral note with white, creamy, and slightly animalic facets.',
    description: 'Description of the olfactive characteristics of the note.',
  })
  @IsNotEmpty()
  @IsString()
  olfactiveDescription: string;

  @ApiProperty({
    example:
      'Jasmine is one of the most iconic flowers in perfumery. It is used in floral compositions as well as oriental and chypre accords to add depth and sophistication.',
    description:
      'Educational description covering the origin, uses, or characteristics of the note.',
  })
  @IsNotEmpty()
  @IsString()
  educationalDescription: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description:
      'Image illustrating the note (image formats only, maximum size: 5 MB).',
  })
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType('image/*')
  image: MemoryStoredFile;

  @ApiProperty({
    enum: NotePyramidLevelEnum,
    example: NotePyramidLevelEnum.MIDDLE,
    description: 'Position of the note within the olfactive pyramid.',
  })
  @IsNotEmpty()
  @IsEnum(NotePyramidLevelEnum)
  pyramidLevel: NotePyramidLevelType;

  @ApiProperty({
    example:
      'Heart notes form the identity of a fragrance. They emerge after the top notes have evaporated and remain noticeable for several hours before giving way to the base notes.',
    description:
      'Explanation of the role of this note within the olfactive pyramid.',
  })
  @IsNotEmpty()
  @IsString()
  pyramidDescription: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identifier of the olfactive family.',
  })
  @IsUUID('4')
  familyId: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identifier of the parent note.',
  })
  @IsOptional()
  @IsUUID('4')
  parentNoteId?: string;
}
