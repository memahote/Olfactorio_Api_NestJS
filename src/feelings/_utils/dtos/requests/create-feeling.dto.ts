import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFeelingDto {
  @ApiProperty({
    description: 'The feeling name',
    example: 'Serenity',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the user associated with this feeling',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  @IsString()
  @IsUUID('4', { each: true })
  userId: string;
}
