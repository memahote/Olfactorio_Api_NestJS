import { Injectable } from '@nestjs/common';
import { GetOlfactiveFamilyDto } from './_utils/dtos/responses/get-olfactive-family.dto';
import { CreatedOlfactiveFamilies, OlfactiveFamilies } from './_utils/types/create-olfactive-family.types';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { Attribute } from 'src/attributes/_utils/types/attributes.types';

@Injectable()
export class OlfactiveFamiliesMapper {
  toGetOlfactiveFamilyDto = (
    olfactiveFamily: OlfactiveFamilies,
    imageUrl: string,
    attributes: Attribute[]
  ): GetOlfactiveFamilyDto => ({
      id: olfactiveFamily.id,
      name: olfactiveFamily.name,
      description: olfactiveFamily.description,
      imageUrl: imageUrl,
      primaryColor: olfactiveFamily.primaryColor,
      secondaryColor: olfactiveFamily.secondaryColor,
      attributes: attributes
  })

  toCreateOlfactiveFamily = (
    olfactiveFamily: CreateOlfactiveFamilyDto,
    fileId: string 
  ): CreatedOlfactiveFamilies => ({
    name: olfactiveFamily.name,
    description: olfactiveFamily.description,
    fileId: fileId,
    primaryColor: olfactiveFamily.primaryColor,
    secondaryColor: olfactiveFamily.secondaryColor
  })
}