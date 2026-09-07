import { Injectable } from '@nestjs/common';
import { GetOlfactiveFamilyDto } from './_utils/dtos/responses/get-olfactive-family.dto';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { FilesService } from 'src/files/files.service';
import {
  OlfactiveFamilyInsert,
  OlfactiveFamilySelect,
  OlfactiveFamilyWithAttributesAndFile,
} from './_utils/types/create-olfactive-family.types';
import { FileSelect } from 'src/files/_utils/types/files.types';
import { FamilyAttributesSelect } from 'src/family_attributes/_utils/types/family_attributes.types';
import { GetAttributeDto } from 'src/attributes/_utils/dtos/responses/get-attribute.dto';

@Injectable()
export class OlfactiveFamiliesMapper {
  constructor(private readonly filesService: FilesService) {}

  toResponse = (
    family: OlfactiveFamilyWithAttributesAndFile,
  ): GetOlfactiveFamilyDto => ({
    id: family.id,
    name: family.name,
    description: family.description,
    imageUrl: this.filesService.buildPublicUrl(family.file),
    primaryColor: family.primaryColor,
    secondaryColor: family.secondaryColor,
    attributes: family.attributes,
  });

  toCreateOlfactiveFamily = (
    olfactiveFamily: CreateOlfactiveFamilyDto,
    fileId: string,
  ): OlfactiveFamilyInsert => ({
    name: olfactiveFamily.name,
    description: olfactiveFamily.description,
    fileId: fileId,
    primaryColor: olfactiveFamily.primaryColor,
    secondaryColor: olfactiveFamily.secondaryColor,
  });
}
