import { ApiProperty } from '@nestjs/swagger';
import { NotePyramidLevelType } from '../../types/note-pyramid-level.type';
import { AttributeSelect } from 'src/attributes/_utils/types/attributes.types';

export class NoteResponseDto {
  @ApiProperty({ example: 'd1231a46-41a3-48c6-a192-23bef2fca311' })
  id: string;

  @ApiProperty({ example: 'Jasmin' })
  name: string;

  @ApiProperty({
    example:
      'Une note florale riche, élégante et sensuelle, aux facettes blanches, crémeuses et légèrement animales.',
  })
  olfactiveDescription: string;

  @ApiProperty({
    example:
      "Le jasmin est l'une des fleurs les plus emblématiques de la parfumerie. Il est utilisé aussi bien dans les compositions florales que dans les accords orientaux et chyprés pour apporter de la profondeur et de la sophistication.",
  })
  educationalDescription: string;

  @ApiProperty({ example: 'https://example:port/bucket/note' })
  imageUrl: string;

  @ApiProperty({ example: 'MIDDLE' })
  pyramidLevel: NotePyramidLevelType;

  @ApiProperty({
    example:
      "Les notes de cœur constituent l'identité du parfum. Elles se révèlent après l'évaporation des notes de tête et persistent plusieurs heures avant de laisser place aux notes de fond",
  })
  pyramidDescription: string;

  attributes: AttributeSelect[]
}
