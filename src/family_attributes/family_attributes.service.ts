import { Injectable } from '@nestjs/common';
import { FamilyAttributesRepository } from './family_attributes.repository';


@Injectable()
export class FamilyAttributesService {
  constructor(
    private readonly familyAttributesRepository: FamilyAttributesRepository,
  ) {}
  async createMany(familyId: string, attributeIds: string[]) {
    const relations = attributeIds.map((attributeId) => ({
      familyId,
      attributeId,
    }));

    return this.familyAttributesRepository.createMany(relations);
  }
}
