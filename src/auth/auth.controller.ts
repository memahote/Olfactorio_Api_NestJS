import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/_utils/decorators/public.decorator';
import { RegisterDto } from './_utils/dtos/requests/register.dto';
import { LoginDto } from './_utils/dtos/requests/login.dto';
import { RefreshTokenDto } from './_utils/dtos/requests/refresh-token.dto';
import { AuthResponseDto } from './_utils/dtos/responses/auth-response.dto';
import { GeneratedTokensDto } from './token/utils/dtos/respones/generated-tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'Email already exists',
  })
  @ApiNotFoundResponse({
    description: 'Role not found',
  })
  @ApiBadRequestResponse({
    description: 'Passwords do not match',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    description: 'User successfully authenticated',
    type: AuthResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh authentication tokens',
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiOkResponse({
    description: 'Tokens successfully refreshed',
    type: GeneratedTokensDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired refresh token',
  })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.rotateRefreshToken(refreshTokenDto);
  }
}
