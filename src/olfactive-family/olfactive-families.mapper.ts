import { Injectable } from '@nestjs/common';

import { GetOlfactiveFamilyDto } from './_utils/dtos/responses/get-olfactive-family.dto';
import { olfactiveFamilies } from './olfactive-families.schema';
import { CreateOlfactiveFamilyDto } from './_utils/dtos/requests/create-olfactive-family.dto';
import { CreateOlfactiveFamily } from './_utils/types/create-olfactive-family.types';

@Injectable()
export class OlfactiveFamiliesMapper {
  toGetOlfactiveFamilyDto = (
    olfactiveFamily: typeof olfactiveFamilies.$inferSelect,
    imageUrl: string
  ): GetOlfactiveFamilyDto => ({
      id: olfactiveFamily.id,
      name: olfactiveFamily.name,
      description: olfactiveFamily.description,
      imageUrl: imageUrl,
      primaryColor: olfactiveFamily.primaryColor,
      secondaryColor: olfactiveFamily.secondaryColor,
 
  })

  toCreateOlfactiveFamily = (
    olfactiveFamily: CreateOlfactiveFamilyDto,
    fileId: string 
  ): CreateOlfactiveFamily => ({
    name: olfactiveFamily.name,
    description: olfactiveFamily.description,
    fileId: fileId,
    primaryColor: olfactiveFamily.primaryColor,
    secondaryColor: olfactiveFamily.secondaryColor
  })
}