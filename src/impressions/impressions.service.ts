import { Injectable } from '@nestjs/common';
import { ImpressionsRepository } from './impressions.repository';
import { CreateImpressionDto } from './_utils/dtos/requests/create-impression.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { GetImpressionDto } from './_utils/dtos/responses/get-impression.dto';

@Injectable()
export class ImpressionsService {
  constructor(private readonly impressionRepository: ImpressionsRepository) {}

  async create(impression: CreateImpressionDto): Promise<GetImpressionDto> {
    const existingImpression =
      await this.impressionRepository.findByDescription(impression.description);

    if (existingImpression) {
      throw Exceptions.ALREADY_EXIST('Impression');
    }

    return this.impressionRepository.create(impression);
  }

  async findAll(): Promise<GetImpressionDto[]> {
    return this.impressionRepository.findAll();
  }

  async findById(id: string): Promise<GetImpressionDto> {
    const impression = this.impressionRepository.findById(id);
    if (!impression) {
      throw Exceptions.NOT_FOUND('Impression');
    }
    return impression;
  }

  async delete(id: string) {
    const deletedImpression = this.impressionRepository.delete(id);
    if (!deletedImpression) {
      throw Exceptions.NOT_FOUND('Impression');
    }
    return deletedImpression;
  }
}
