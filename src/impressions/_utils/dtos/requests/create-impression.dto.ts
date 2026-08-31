import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateImpressionDto {
  @ApiProperty({
      description: 'The impression description',
      example: 'A sense of calm',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}