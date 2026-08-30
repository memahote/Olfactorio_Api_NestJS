import { Injectable } from '@nestjs/common';
import { AttributesRepository } from './attributes.repository';
import { CreateAttributeDto } from './_utils/dtos/requests/create-attribute.dto';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { GetAttributeDto } from './_utils/dtos/responses/get-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async create(createDto: CreateAttributeDto): Promise<GetAttributeDto> {
    const existingAttribute = await this.attributesRepository.findByName(
      createDto.name,
    );

    if (existingAttribute) {
      throw Exceptions.ALREADY_EXIST('Attribute');
    }

    return this.attributesRepository.create(createDto);
  }

  async findAll(): Promise<GetAttributeDto[]> {
    return this.attributesRepository.findAll();
  }

  async findById(id: string): Promise<GetAttributeDto> {
    const attribute = await this.attributesRepository.findById(id);

    if (!attribute) {
      throw Exceptions.NOT_FOUND('Attribute');
    }

    return attribute;
  }

  async delete(id: string): Promise<GetAttributeDto> {
    const deletedAttribute = await this.attributesRepository.delete(id);

    if (!deletedAttribute) {
      throw Exceptions.NOT_FOUND('Attribute');
    }

    return deletedAttribute;
  }
}
