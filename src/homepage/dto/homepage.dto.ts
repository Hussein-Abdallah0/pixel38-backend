import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { swaggerExamples } from '../../common/swagger/api-examples';

export class UpdateHeroDto {
  @ApiProperty({ example: 'Crafted Wood, Timeless Design' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Premium wood products for modern living' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({ example: 'View Products' })
  @IsOptional()
  @IsString()
  ctaLabel?: string;

  @ApiPropertyOptional({ example: '/products' })
  @IsOptional()
  @IsString()
  ctaHref?: string;

  @ApiProperty({ example: 'https://cdn.example.com/hero.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: 'Workshop with wood panels' })
  @IsOptional()
  @IsString()
  imageAlt?: string;
}

export class HeroResponseDto {
  @ApiProperty({ example: 'homepage-hero' })
  id: string;

  @ApiProperty({ example: 'Solid wood products' })
  title: string;

  @ApiPropertyOptional({ nullable: true, example: 'Oak, beech, ash from 1700 CZK per m3' })
  subtitle: string | null;

  @ApiPropertyOptional({ nullable: true, example: 'Order' })
  ctaLabel: string | null;

  @ApiPropertyOptional({ nullable: true, example: '#contacts' })
  ctaHref: string | null;

  @ApiProperty({ example: 'https://cdn.example.com/hero.jpg' })
  imageUrl: string;

  @ApiPropertyOptional({ nullable: true, example: 'Solid wood furniture workshop' })
  imageAlt: string | null;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  updatedAt: Date;
}

export class CreateBannerDto {
  @ApiProperty({ example: 'Summer Collection' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'New arrivals in oak and walnut' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ example: 'https://cdn.example.com/banners/summer.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: 'Summer wood collection banner' })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @ApiPropertyOptional({ example: '/products?collection=summer' })
  @IsOptional()
  @IsString()
  linkHref?: string;

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

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}

export class BannerResponseDto {
  @ApiProperty({ example: 'clbanner001abc' })
  id: string;

  @ApiProperty({ example: 'Summer Collection' })
  title: string;

  @ApiPropertyOptional({ nullable: true, example: 'New arrivals in oak and walnut' })
  subtitle: string | null;

  @ApiProperty({ example: 'https://cdn.example.com/banners/summer.jpg' })
  imageUrl: string;

  @ApiPropertyOptional({ nullable: true, example: 'Summer wood collection banner' })
  imageAlt: string | null;

  @ApiPropertyOptional({ nullable: true, example: '/products?collection=summer' })
  linkHref: string | null;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  updatedAt: Date;
}

export class CreateTextSectionDto {
  @ApiProperty({ example: 'about' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'About Our Craft' })
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty({ example: 'We source sustainable hardwoods and craft each piece by hand.' })
  @IsString()
  @IsNotEmpty()
  body: string;

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

export class UpdateTextSectionDto extends PartialType(CreateTextSectionDto) {}

export class TextSectionResponseDto {
  @ApiProperty({ example: 'cltext001abc' })
  id: string;

  @ApiProperty({ example: 'about' })
  key: string;

  @ApiProperty({ example: 'About Our Craft' })
  heading: string;

  @ApiProperty({ example: 'We source sustainable hardwoods and craft each piece by hand.' })
  body: string;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  updatedAt: Date;
}

export class CreateHomepageImageDto {
  @ApiProperty({ example: 'https://cdn.example.com/home/gallery-1.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: 'Hand-planed oak surface' })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @ApiPropertyOptional({ example: 'Workshop detail' })
  @IsOptional()
  @IsString()
  caption?: string;

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

export class UpdateHomepageImageDto extends PartialType(CreateHomepageImageDto) {}

export class HomepageImageResponseDto {
  @ApiProperty({ example: 'clhomeimg001abc' })
  id: string;

  @ApiProperty({ example: 'https://cdn.example.com/home/gallery-1.jpg' })
  imageUrl: string;

  @ApiPropertyOptional({ nullable: true, example: 'Hand-planed oak surface' })
  imageAlt: string | null;

  @ApiPropertyOptional({ nullable: true, example: 'Workshop detail' })
  caption: string | null;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-11T17:30:00.000Z' })
  updatedAt: Date;
}

export class HomepageResponseDto {
  @ApiProperty({ type: HeroResponseDto, nullable: true, example: swaggerExamples.homepage.response.hero })
  hero: HeroResponseDto | null;

  @ApiProperty({ type: [BannerResponseDto], example: swaggerExamples.homepage.response.banners })
  banners: BannerResponseDto[];

  @ApiProperty({ type: [TextSectionResponseDto], example: swaggerExamples.homepage.response.textSections })
  textSections: TextSectionResponseDto[];

  @ApiProperty({ type: [HomepageImageResponseDto], example: swaggerExamples.homepage.response.images })
  images: HomepageImageResponseDto[];
}

export class PatchHomepageBannerItemDto extends UpdateBannerDto {
  @ApiProperty({ example: 'clbanner001abc' })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PatchHomepageTextSectionItemDto extends UpdateTextSectionDto {
  @ApiProperty({ example: 'cltext001abc' })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PatchHomepageImageItemDto extends UpdateHomepageImageDto {
  @ApiProperty({ example: 'clhomeimg001abc' })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PatchHomepageContentDto {
  @ApiPropertyOptional({ type: UpdateHeroDto, example: swaggerExamples.homepage.patchRequest.hero })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHeroDto)
  hero?: UpdateHeroDto;

  @ApiPropertyOptional({
    type: [PatchHomepageBannerItemDto],
    example: swaggerExamples.homepage.patchRequest.banners,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatchHomepageBannerItemDto)
  banners?: PatchHomepageBannerItemDto[];

  @ApiPropertyOptional({
    type: [PatchHomepageTextSectionItemDto],
    example: swaggerExamples.homepage.patchRequest.textSections,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatchHomepageTextSectionItemDto)
  textSections?: PatchHomepageTextSectionItemDto[];

  @ApiPropertyOptional({
    type: [PatchHomepageImageItemDto],
    example: swaggerExamples.homepage.patchRequest.images,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatchHomepageImageItemDto)
  images?: PatchHomepageImageItemDto[];
}
