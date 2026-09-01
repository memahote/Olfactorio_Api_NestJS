import { ApiProperty } from '@nestjs/swagger';
import { GeneratedTokensDto } from 'src/auth/token/utils/dtos/respones/generated-tokens.dto';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';

export class AuthResponseDto {
  @ApiProperty({
    type: GetUserDto,
  })
  user: GetUserDto;
  @ApiProperty({
    type: GeneratedTokensDto,
  })
  tokens: GeneratedTokensDto;
}
