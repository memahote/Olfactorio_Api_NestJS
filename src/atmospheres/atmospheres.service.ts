import { Injectable } from '@nestjs/common';
import { AtmospheresRepository } from './atmospheres.repository';
import { CreateAtmosphereDto } from './_utils/dtos/requests/create-atmosphere.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { FilesService } from 'src/files/files.service';
import {
  FilesDirectoryEnum,
  FilesDirectoryPrivacyEnum,
} from 'src/files/_utils/enums/files.enums';
import { AtmospheresMapper } from './atmospheres.mapper';
import { GetAtmosphereDto } from './_utils/dtos/responses/get-atmosphere.dto';

@Injectable()
export class AtmospheresService {
  constructor(
    private readonly atmosphereRepository: AtmospheresRepository,
    private readonly filesService: FilesService,
    private readonly atmospheresMapper: AtmospheresMapper,
  ) {}

  async createPersonalAtmosphere(
    atmosphereDto: CreateAtmosphereDto,
    userId: string,
  ): Promise<GetAtmosphereDto> {
    const existingAtmosphere =
      await this.atmosphereRepository.findByOwnerIdAndName(
        userId,
        atmosphereDto.name,
      );

    if (existingAtmosphere) {
      throw Exceptions.ALREADY_EXIST('Atmosphere');
    }

    const file = await this.filesService.uploadFile(
      atmosphereDto.file,
      FilesDirectoryPrivacyEnum.PRIVATE,
      FilesDirectoryEnum.ATMOSPHERES,
    );

    try {
      const atmosphere = await this.atmosphereRepository.create(
        this.atmospheresMapper.toAtmosphereInsert(
          atmosphereDto,
          userId,
          file.id,
        ),
      );

      return this.atmospheresMapper.toGetAtmosphereDto({
        ...atmosphere,
        file,
      });
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async createDefaultAtmosphere(
    dto: CreateAtmosphereDto,
  ): Promise<GetAtmosphereDto> {
    const existing = await this.atmosphereRepository.findDefaultByName(
      dto.name,
    );

    if (existing) {
      throw Exceptions.ALREADY_EXIST('Atmosphere');
    }

    const file = await this.filesService.uploadFile(
      dto.file,
      FilesDirectoryPrivacyEnum.PRIVATE,
      FilesDirectoryEnum.ATMOSPHERES,
    );

    try {
      const atmosphere = await this.atmosphereRepository.create(
        this.atmospheresMapper.toAtmosphereInsert(dto, null, file.id),
      );

      return this.atmospheresMapper.toGetAtmosphereDto({
        ...atmosphere,
        file,
      });
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async findOne(id: string, userId: string): Promise<GetAtmosphereDto> {
    const atmosphere = await this.atmosphereRepository.findVisibleById(
      id,
      userId,
    );

    if (!atmosphere) {
      throw Exceptions.NOT_FOUND('Atmosphere');
    }

    return this.atmospheresMapper.toGetAtmosphereDto(atmosphere);
  }

  async findAllUserAtmospheres(userId: string): Promise<GetAtmosphereDto[]> {
    const atmospheres =
      await this.atmosphereRepository.findAllUserAtmospheres(userId);

    return Promise.all(
      atmospheres.map((atmosphere) => {
        return this.atmospheresMapper.toGetAtmosphereDto(atmosphere);
      }),
    );
  }

  async findAllDefault() {
    const atmospheres = await this.atmosphereRepository.findAllDefault();

    return Promise.all(
      atmospheres.map((atmosphere) => {
        return this.atmospheresMapper.toGetAtmosphereDto(atmosphere);
      }),
    );
  }

  async findAllAtmosphere(): Promise<GetAtmosphereDto[]> {
    const atmospheres = await this.atmosphereRepository.findAllAtmosphere();

    return Promise.all(
      atmospheres.map((atmosphere) => {
        return this.atmospheresMapper.toGetAtmosphereDto(atmosphere);
      }),
    );
  }

  async delete(id: string, userId: string) {
    const deleteAtmosphere = await this.atmosphereRepository.findById(id);

    if (!deleteAtmosphere) {
      throw Exceptions.NOT_FOUND('Atmosphere');
    }

    await this.atmosphereRepository.delete(id, userId);

    await this.filesService.deleteFile(deleteAtmosphere.file);

    return deleteAtmosphere;
  }

  async deleteDefault(id: string) {
    const deleteAtmosphere = await this.atmosphereRepository.findById(id);

    if (!deleteAtmosphere) {
      throw Exceptions.NOT_FOUND('Atmosphere');
    }

    await this.atmosphereRepository.deleteDefault(id);

    await this.filesService.deleteFile(deleteAtmosphere.file);

    return deleteAtmosphere;
  }
}
