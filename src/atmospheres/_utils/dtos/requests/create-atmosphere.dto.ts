import { IsNotEmpty, IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateAtmosphereDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsFile()
  file: MemoryStoredFile;
}
