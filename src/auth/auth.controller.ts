import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { swaggerExamples } from '../common/swagger/api-examples';
import { AuthService } from './auth.service';
import { AuthTokensDto, UserProfileDto } from './dto/auth-response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
    type: LoginDto,
    examples: {
      default: {
        summary: 'Admin login',
        value: swaggerExamples.auth.loginRequest,
      },
    },
  })
  @ApiOkResponse({
    type: AuthTokensDto,
    schema: { example: swaggerExamples.auth.tokensResponse },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate access and refresh tokens' })
  @ApiBody({
    type: RefreshTokenDto,
    examples: {
      default: {
        summary: 'Refresh tokens',
        value: swaggerExamples.auth.refreshRequest,
      },
    },
  })
  @ApiOkResponse({
    type: AuthTokensDto,
    schema: { example: swaggerExamples.auth.tokensResponse },
  })
  refresh(@CurrentUser() user: User, @Body() _dto: RefreshTokenDto) {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  @ApiNoContentResponse()
  async logout(@CurrentUser() user: User): Promise<void> {
    await this.authService.logout(user.id);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({
    type: UserProfileDto,
    schema: { example: swaggerExamples.auth.userProfile },
  })
  me(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
