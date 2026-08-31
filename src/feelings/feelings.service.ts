import { Injectable } from '@nestjs/common';
import { FeelingsRepository } from './feelings.repository';
import { CreateFeelingDto } from './_utils/dtos/requests/create-feeling.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { GetFeelingDto } from './_utils/dtos/responses/get-feeling.dto';

@Injectable()
export class FeelingsService {
  constructor(private readonly feelingsRepository: FeelingsRepository) {}

  async create(feelingDto: CreateFeelingDto): Promise<GetFeelingDto> {
    const existingFeeling =
      await this.feelingsRepository.findByUserIdAndName(feelingDto);

    if (existingFeeling) {
      throw Exceptions.ALREADY_EXIST('Feeling');
    }

    return this.feelingsRepository.create(feelingDto);
  }

  async findAll(): Promise<GetFeelingDto[]>{
    return this.feelingsRepository.findAll()
  }

  async findById(id: string): Promise<GetFeelingDto>{
    const feeling = await this.feelingsRepository.findById(id)

    if (!feeling) {
      throw Exceptions.NOT_FOUND("Feeling")
    }

    return feeling
  }

  async delete(id: string): Promise<GetFeelingDto>{
    const deletedfeeling = await this.feelingsRepository.delete(id)

    if (!deletedfeeling) {
      throw Exceptions.NOT_FOUND("Feeling")
    }

    return deletedfeeling
  }
}
