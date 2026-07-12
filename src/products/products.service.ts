import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { slugify } from '../common/utils/slug.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(
    publishedOnly = false,
    includeImages = false,
  ): Promise<Product[] | ProductWithImages[]> {
    const where: Prisma.ProductWhereInput = publishedOnly
      ? { isPublished: true }
      : {};

    return this.prisma.product.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: includeImages
        ? { images: { orderBy: { sortOrder: 'asc' } } }
        : undefined,
    });
  }

  async findOne(idOrSlug: string, includeImages = true): Promise<ProductWithImages> {
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: includeImages
        ? { images: { orderBy: { sortOrder: 'asc' } } }
        : undefined,
    });

    if (!product) {
      throw new NotFoundException(`Product "${idOrSlug}" not found`);
    }

    return product as ProductWithImages;
  }

  async create(dto: CreateProductDto): Promise<ProductWithImages> {
    const slug = dto.slug?.trim() || slugify(dto.name);

    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Product with slug "${slug}" already exists`);
    }

    return this.prisma.product.create({
      data: { ...dto, slug },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductWithImages> {
    await this.findOne(id, false);

    if (dto.slug) {
      const existing = await this.prisma.product.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException(`Product with slug "${dto.slug}" already exists`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async remove(id: string): Promise<Product> {
    await this.findOne(id, false);
    return this.prisma.product.delete({ where: { id } });
  }

  async reorder(items: { id: string; sortOrder: number }[]): Promise<ProductWithImages[]> {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.product.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    return this.findAll(false, true) as Promise<ProductWithImages[]>;
  }
}
