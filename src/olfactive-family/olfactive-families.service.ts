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
import { GetOlfactiveFamilyDto } from './_utils/dtos/responses/get-olfactive-family.dto';
import { Transactional } from '@nestjs-cls/transactional';
import { FamilyAttributesService } from 'src/family_attributes/family_attributes.service';

@Injectable()
export class OlfactiveFamiliesService {
  constructor(
    private readonly olfactiveFamilyRepository: OlfactiveFamiliesRepository,
    private readonly olfactiveFamilyMapper: OlfactiveFamiliesMapper,
    private readonly filesService: FilesService,
    private readonly familyAttributesService: FamilyAttributesService,
  ) {}

  @Transactional()
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
      const olfactiveFamily = await this.olfactiveFamilyRepository.create(
        this.olfactiveFamilyMapper.toCreateOlfactiveFamily(
          createOlfactiveFamilyDto,
          file.id,
        ),
      );

      await this.familyAttributesService.createMany(
        olfactiveFamily.id,
        createOlfactiveFamilyDto.attributeIds,
      );

      return olfactiveFamily;
    } catch (error) {
      await this.filesService.deleteFile(file);
      throw error;
    }
  }

  async getOlfactiveFamilies() {
    const families =
      await this.olfactiveFamilyRepository.findAllWithAttributes();

    return families.map((family) =>
      this.olfactiveFamilyMapper.toResponse(family),
    );
  }

  async getOlfactiveFamilyById(id: string): Promise<GetOlfactiveFamilyDto> {
    const family =
      await this.olfactiveFamilyRepository.findByIdWithAttributes(id);

    if (!family) {
      throw Exceptions.NOT_FOUND('Olfactive family');
    }

    return this.olfactiveFamilyMapper.toResponse(family);
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
