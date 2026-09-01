import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { GetAtmosphereDto } from './_utils/dtos/responses/get-atmosphere.dto';
import { Atmosphere, CreateAtmosphere } from './_utils/types/atmospheres.types';

export class AtmospheresMapper {
  toCreateAtmosphereData = (
    atmosphereDto: CreateAtmosphereDto,
    ownerId: string | null,
    fileId: string,
  ): CreateAtmosphere => ({
    name: atmosphereDto.name,
    ownerId: ownerId,
    fileId: fileId,
  });

  toGetAtmosphereDto = (atmosphere: Atmosphere, imageUrl: string): GetAtmosphereDto => ({
    id: atmosphere.id,
    name: atmosphere.name,
    ownerId: atmosphere.ownerId,
    imageUrl: imageUrl
  })
}
