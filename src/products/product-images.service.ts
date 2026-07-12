import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductImage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './products.service';
import {
  CreateProductImageDto,
  UpdateProductImageDto,
} from './dto/product.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async findAll(productId: string): Promise<ProductImage[]> {
    await this.productsService.findOne(productId, false);

    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(
    productId: string,
    dto: CreateProductImageDto,
  ): Promise<ProductImage> {
    await this.productsService.findOne(productId, false);

    return this.prisma.productImage.create({
      data: { ...dto, productId },
    });
  }

  async update(
    productId: string,
    imageId: string,
    dto: UpdateProductImageDto,
  ): Promise<ProductImage> {
    await this.ensureImageBelongsToProduct(productId, imageId);

    return this.prisma.productImage.update({
      where: { id: imageId },
      data: dto,
    });
  }

  async remove(productId: string, imageId: string): Promise<ProductImage> {
    await this.ensureImageBelongsToProduct(productId, imageId);
    return this.prisma.productImage.delete({ where: { id: imageId } });
  }

  async reorder(
    productId: string,
    items: { id: string; sortOrder: number }[],
  ): Promise<ProductImage[]> {
    await this.productsService.findOne(productId, false);

    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.productImage.update({
          where: { id: item.id, productId },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    return this.findAll(productId);
  }

  private async ensureImageBelongsToProduct(
    productId: string,
    imageId: string,
  ): Promise<ProductImage> {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });

    if (!image) {
      throw new NotFoundException(
        `Image "${imageId}" not found for product "${productId}"`,
      );
    }

    return image;
  }
}
