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

export class CreateProductDto {
  @ApiProperty({ example: swaggerExamples.product.createRequest.name })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: swaggerExamples.product.createRequest.slug })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: swaggerExamples.product.createRequest.description })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: swaggerExamples.product.createRequest.woodType })
  @IsString()
  @IsNotEmpty()
  woodType: string;

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

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductImageResponseDto {
  @ApiProperty({ example: swaggerExamples.productImage.response.id })
  id: string;

  @ApiProperty({ example: swaggerExamples.productImage.response.productId })
  productId: string;

  @ApiProperty({ example: swaggerExamples.productImage.response.imageUrl })
  imageUrl: string;

  @ApiPropertyOptional({ nullable: true, example: swaggerExamples.productImage.response.imageAlt })
  imageAlt: string | null;

  @ApiProperty({ example: swaggerExamples.productImage.response.sortOrder })
  sortOrder: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: swaggerExamples.product.response.id })
  id: string;

  @ApiProperty({ example: swaggerExamples.product.response.name })
  name: string;

  @ApiProperty({ example: swaggerExamples.product.response.slug })
  slug: string;

  @ApiProperty({ example: swaggerExamples.product.response.description })
  description: string;

  @ApiProperty({ example: swaggerExamples.product.response.woodType })
  woodType: string;

  @ApiProperty({ example: swaggerExamples.product.response.sortOrder })
  sortOrder: number;

  @ApiProperty({ example: swaggerExamples.product.response.isPublished })
  isPublished: boolean;

  @ApiProperty({ example: swaggerExamples.product.response.createdAt })
  createdAt: Date;

  @ApiProperty({ example: swaggerExamples.product.response.updatedAt })
  updatedAt: Date;

  @ApiPropertyOptional({ type: [ProductImageResponseDto], example: swaggerExamples.product.response.images })
  images?: ProductImageResponseDto[];
}

export class CreateProductImageDto {
  @ApiProperty({ example: swaggerExamples.productImage.createRequest.imageUrl })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: swaggerExamples.productImage.createRequest.imageAlt })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @ApiPropertyOptional({ example: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
