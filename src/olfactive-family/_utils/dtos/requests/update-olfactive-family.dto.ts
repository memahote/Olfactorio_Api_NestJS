import { PartialType } from '@nestjs/swagger';
import { CreateOlfactiveFamilyDto } from './create-olfactive-family.dto';

export class UpdateOlfactiveFamilyDto extends PartialType(
  CreateOlfactiveFamilyDto,
) {}
