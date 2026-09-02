import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { GetAtmosphereDto } from './_utils/dtos/responses/get-atmosphere.dto';
import { AtmosphereInsert, AtmosphereSelect } from './_utils/types/atmospheres.types';

export class AtmospheresMapper {
  toCreateAtmosphereData = (
    atmosphereDto: CreateAtmosphereDto,
    ownerId: string | null,
    fileId: string,
  ): AtmosphereInsert => ({
    name: atmosphereDto.name,
    ownerId: ownerId,
    fileId: fileId,
  });

  toGetAtmosphereDto = (atmosphere: AtmosphereSelect, imageUrl: string): GetAtmosphereDto => ({
    id: atmosphere.id,
    name: atmosphere.name,
    ownerId: atmosphere.ownerId,
    imageUrl: imageUrl
  })
}
