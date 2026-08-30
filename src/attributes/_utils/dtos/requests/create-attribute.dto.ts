import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttributeDto {
  @ApiProperty({
      description: 'Name of the attribute',
      example: 'Fresh',
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}