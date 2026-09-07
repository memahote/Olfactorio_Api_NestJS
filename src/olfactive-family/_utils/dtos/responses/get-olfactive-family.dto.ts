import { ApiProperty } from '@nestjs/swagger';
import { GetAttributeDto } from 'src/attributes/_utils/dtos/responses/get-attribute.dto';
import { FamilyAttributesSelect } from 'src/family_attributes/_utils/types/family_attributes.types';

export class GetOlfactiveFamilyDto {
  @ApiProperty({
    description: 'Olfactive family unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the olfactive family',
    example: 'Woody',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the olfactive family',
    example: 'Warm and woody olfactive family.',
  })
  description: string;

  @ApiProperty({
    description: 'Public URL of the family image',
    example: 'https://storage.example.com/public/olfactive-family/xxx-picture',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Primary color in hexadecimal format',
    example: '#8B4513',
  })
  primaryColor: string;

  @ApiProperty({
    description: 'Secondary color in hexadecimal format',
    example: '#D2691E',
  })
  secondaryColor: string;

  @ApiProperty({
    description: 'Attributes associated with the olfactive family',
    type: [GetAttributeDto],
  })
  attributes: GetAttributeDto[];
}
