import { ApiProperty } from '@nestjs/swagger';
import { swaggerExamples } from '../../common/swagger/api-examples';

export class AuthTokensDto {
  @ApiProperty({ example: swaggerExamples.auth.tokensResponse.accessToken })
  accessToken: string;

  @ApiProperty({ example: swaggerExamples.auth.tokensResponse.refreshToken })
  refreshToken: string;
}

export class UserProfileDto {
  @ApiProperty({ example: swaggerExamples.auth.userProfile.id })
  id: string;

  @ApiProperty({ example: swaggerExamples.auth.userProfile.email })
  email: string;

  @ApiProperty({ example: swaggerExamples.auth.userProfile.role })
  role: string;

  @ApiProperty({ example: swaggerExamples.auth.userProfile.createdAt })
  createdAt: Date;
}
