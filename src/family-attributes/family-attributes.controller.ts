import { Controller } from '@nestjs/common';
import { FamilyAttributesService } from './family-attributes.service';

@Controller('family-attributes')
export class FamilyAttributesController {
  constructor(private readonly familyAttributesService: FamilyAttributesService) {}
}
