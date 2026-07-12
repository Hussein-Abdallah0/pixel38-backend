import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { swaggerExamples } from '../../common/swagger/api-examples';

export class LoginDto {
  @ApiProperty({ example: swaggerExamples.auth.loginRequest.email })
  @IsEmail()
  email: string;

  @ApiProperty({ example: swaggerExamples.auth.loginRequest.password, minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
