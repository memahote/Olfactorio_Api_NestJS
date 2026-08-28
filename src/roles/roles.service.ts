import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './utils/dtos/requests/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.create(createRoleDto);
  }

  async getRoles() {
    return this.rolesRepository.getRoles();
  }

  async findByName(name: string) {
    return this.rolesRepository.findByName(name);
  }

  async findById(id: string) {
    return this.rolesRepository.findById(id);
  }

  async delete(id: string) {
    return this.rolesRepository.delete(id);
  }
}
