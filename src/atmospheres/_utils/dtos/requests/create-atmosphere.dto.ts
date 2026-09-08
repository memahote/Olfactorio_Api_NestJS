import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class CreateAtmosphereDto {
  @ApiProperty({
    example: 'Cocooning',
    description: 'Atmosphere name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Cocooning.png',
    description: 'Illustrative image',
  })
  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType('image/*')
  file: MemoryStoredFile;
}
