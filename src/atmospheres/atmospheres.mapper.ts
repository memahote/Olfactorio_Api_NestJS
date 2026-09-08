import { FilesService } from 'src/files/files.service';
import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { GetAtmosphereDto } from './_utils/dtos/responses/get-atmosphere.dto';
import {
  AtmosphereInsert,
  AtmosphereWithFile,
} from './_utils/types/atmospheres.types';

export class AtmospheresMapper {
  constructor(private readonly filesService: FilesService) {}
  toAtmosphereInsert = (
    atmosphereDto: CreateAtmosphereDto,
    ownerId: string | null,
    fileId: string,
  ): AtmosphereInsert => ({
    name: atmosphereDto.name,
    ownerId: ownerId,
    fileId: fileId,
  });

  toGetAtmosphereDto = (
    atmosphere: AtmosphereWithFile
  ): GetAtmosphereDto => ({
    id: atmosphere.id,
    name: atmosphere.name,
    ownerId: atmosphere.ownerId,
    imageUrl: this.filesService.buildPublicUrl(atmosphere.file),
  });
}
