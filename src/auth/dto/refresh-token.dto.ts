import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { swaggerExamples } from '../../common/swagger/api-examples';

export class RefreshTokenDto {
  @ApiProperty({
    example: swaggerExamples.auth.refreshRequest.refreshToken,
    description: 'Refresh token returned from login or refresh',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
