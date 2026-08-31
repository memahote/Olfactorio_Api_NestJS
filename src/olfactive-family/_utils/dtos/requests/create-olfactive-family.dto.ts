import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsHexColor, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class CreateOlfactiveFamilyDto {
  @ApiProperty({
    description: 'Name of the olfactive family',
    example: 'Woody',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the olfactive family',
    example: 'Olfactive family characterized by warm and woody notes.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Image representing the olfactive family',
    type: 'string',
    format: 'binary',
  })
  @IsFile()
  @MaxFileSize(5 * 1024 * 1024)
  @HasMimeType(['image/*'])
  image: MemoryStoredFile;

  @ApiProperty({
    description: 'Primary color in hexadecimal format',
    example: '#8B4513',
  })
  @IsNotEmpty()
  @IsHexColor()
  primaryColor: string;

  @ApiProperty({
    description: 'Secondary color in hexadecimal format',
    example: '#D2691E',
  })
  @IsNotEmpty()
  @IsHexColor()
  secondaryColor: string;

  @ApiProperty({
    description: 'IDs of the attributes associated with this family',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    ],
    type: [String],
  })
  @IsArray()
  // @IsUUID('4', { each: true })
  attributeIds: string[];

}
