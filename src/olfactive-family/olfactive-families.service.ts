import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { FilesService } from 'src/files/files.service';
import {
  FilesDirectoryEnum,
  FilesDirectoryPrivacyEnum,
} from 'src/files/_utils/enums/files.enums';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { OlfactiveFamiliesMapper } from './olfactive-families.mapper';
import { OlfactiveFamiliesRepository } from './olfactive-families.repository';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { olfactiveFamilies } from './olfactive-families.schema';

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
    let olfactiveFamily: typeof olfactiveFamilies.$inferSelect | null = null;
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
      olfactiveFamily = await this.olfactiveFamilyRepository.create(
        this.olfactiveFamilyMapper.toCreateOlfactiveFamily(
          createOlfactiveFamilyDto,
          file.id,
        ),
      );
    } catch (error) {
      await this.filesService.deleteFile(file);

      throw error;
    }

    const imageUrl = await this.filesService.getPublicUrl(file.id);

    return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
      olfactiveFamily,
      imageUrl,
    );
  }

  async getOlfactiveFamilies() {
    const olfactiveFamilies = await this.olfactiveFamilyRepository.findAll();

    return Promise.all(
      olfactiveFamilies.map(async (olfactiveFamily) => {
        const imageUrl = await this.filesService.getPublicUrl(
          olfactiveFamily.fileId,
        );

        return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
          olfactiveFamily,
          imageUrl,
        );
      }),
    );
  }

  async getOlfactiveFamilyById(id: string) {
    const olfactiveFamily = await this.olfactiveFamilyRepository.findById(id);

    if (!olfactiveFamily) {
      throw Exceptions.NOT_FOUND('Olfactive family');
    }

    const imageUrl = await this.filesService.getPublicUrl(
      olfactiveFamily.fileId,
    );

    return this.olfactiveFamilyMapper.toGetOlfactiveFamilyDto(
      olfactiveFamily,
      imageUrl,
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

    await this.filesService.deleteFile(file);

    await this.olfactiveFamilyRepository.delete(id);
  }
}
