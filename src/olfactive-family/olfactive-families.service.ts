import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import {
  FilesDirectoryEnum,
  FilesDirectoryPrivacyEnum,
} from 'src/files/_utils/enums/files.enums';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { OlfactiveFamiliesMapper } from './olfactive-families.mapper';
import { OlfactiveFamiliesRepository } from './olfactive-families.repository';
import { Exceptions } from 'src/_utils/exceptions/exceptions';

@Injectable()
export class OlfactiveFamiliesService {
  constructor(
    private readonly olfactiveFamilyRepository: OlfactiveFamiliesRepository,
    private readonly olfactiveFamilyMapper: OlfactiveFamiliesMapper,
    private readonly filesService: FilesService,
  ) {}

  async createOlfactiveFamily(
    createOlfactiveFamilyDto: CreateOlfactiveFamilyDto,
  ) {
    const existingFamily = await this.olfactiveFamilyRepository.findByName(
      createOlfactiveFamilyDto.name,
    );

    if (existingFamily) {
      throw Exceptions.ALREADY_EXIST('Olfactive family');
    }

    const file = await this.filesService.uploadFile(
      createOlfactiveFamilyDto.image,
      FilesDirectoryPrivacyEnum.PUBLIC,
      FilesDirectoryEnum.OLFACTIVE_FAMILIES,
    );

    try {
      const olfactiveFamily =
        await this.olfactiveFamilyRepository.createWithAttributes(
          this.olfactiveFamilyMapper.toCreateOlfactiveFamily(
            createOlfactiveFamilyDto,
            file.id,
          ),
          createOlfactiveFamilyDto.attributeIds,
        );

      const imageUrl = await this.filesService.getPublicUrl(file.id);

      return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
        olfactiveFamily.family,
        imageUrl,
        olfactiveFamily.attributes,
      );
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async getOlfactiveFamilies() {
    const families =
      await this.olfactiveFamilyRepository.findAllWithAttributes();

    return Promise.all(
      families.map(async ({ family, attributes }) => {
        const imageUrl = await this.filesService.getPublicUrl(family.fileId);

        return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
          family,
          imageUrl,
          attributes,
        );
      }),
    );
  }

  async getOlfactiveFamilyById(id: string) {
    const rows =
      await this.olfactiveFamilyRepository.findByIdWithAttributes(id);

    if (rows.length === 0) {
      throw Exceptions.NOT_FOUND('Olfactive family');
    }

    const family = rows[0].family;

    const attributes = rows.map((row) => row.attribute);

    const imageUrl = await this.filesService.getPublicUrl(family.fileId);

    return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
      family,
      imageUrl,
      attributes,
    );
  }

  async deleteOlfactiveFamily(id: string) {
    const olfactiveFamily = await this.olfactiveFamilyRepository.findById(id);

    if (!olfactiveFamily) {
      throw Exceptions.NOT_FOUND('Olfactive family');
    }

    const file = await this.filesService.getFileById(olfactiveFamily.fileId);

    if (!file) {
      throw Exceptions.NOT_FOUND('File');
    }

    await this.olfactiveFamilyRepository.delete(id);

    await this.filesService.deleteFile(file);
  }
}
