import { PartialType } from '@nestjs/swagger';
import { CreateAtmosphereDto } from './create-atmosphere.dto';

export class UpdateAtmosphereDto extends PartialType(CreateAtmosphereDto) {}
