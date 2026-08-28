import { GeneratedTokens } from 'src/auth/token/utils/types/generated-tokens.type';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';

export class AuthResponseDto {
  user: GetUserDto;
  tokens: GeneratedTokens;
}
