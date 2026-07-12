import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { swaggerExamples } from '../../common/swagger/api-examples';

export class CreateServiceDto {
  @ApiProperty({ example: swaggerExamples.service.createRequest.title })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: swaggerExamples.service.createRequest.description })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: swaggerExamples.service.createRequest.iconUrl })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional({ example: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

export class ServiceResponseDto {
  @ApiProperty({ example: swaggerExamples.service.response.id })
  id: string;

  @ApiProperty({ example: swaggerExamples.service.response.title })
  title: string;

  @ApiProperty({ example: swaggerExamples.service.response.description })
  description: string;

  @ApiPropertyOptional({ nullable: true, example: swaggerExamples.service.response.iconUrl })
  iconUrl: string | null;

  @ApiProperty({ example: swaggerExamples.service.response.sortOrder })
  sortOrder: number;

  @ApiProperty({ example: swaggerExamples.service.response.isPublished })
  isPublished: boolean;

  @ApiProperty({ example: swaggerExamples.service.response.createdAt })
  createdAt: Date;

  @ApiProperty({ example: swaggerExamples.service.response.updatedAt })
  updatedAt: Date;
}
