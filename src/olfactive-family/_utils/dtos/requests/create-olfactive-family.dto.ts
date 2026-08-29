import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString, IsUrl } from 'class-validator';
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
}
