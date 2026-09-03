import { Injectable } from '@nestjs/common';
import { ExploredFamiliesRepository } from './explored_familes.repository';

@Injectable()
export class ExploredFamiliesService {
  constructor(
    private readonly exploredFamiliesRepository: ExploredFamiliesRepository,
  ) {}

  async explore(userId: string, familyId: string) {
    return this.exploredFamiliesRepository.create(userId, familyId);
  }
}
