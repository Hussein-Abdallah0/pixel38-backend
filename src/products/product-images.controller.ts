import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { swaggerExamples } from '../common/swagger/api-examples';
import {
  CreateProductImageDto,
  ProductImageResponseDto,
  UpdateProductImageDto,
} from './dto/product.dto';
import { ProductImagesService } from './product-images.service';

@ApiTags('Product Images')
@Controller('products/:productId/images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List images for a product (public)' })
  @ApiParam({
    name: 'productId',
    example: swaggerExamples.product.response.id,
  })
  @ApiOkResponse({
    type: ProductImageResponseDto,
    isArray: true,
    schema: { example: swaggerExamples.product.response.images },
  })
  findAll(@Param('productId') productId: string) {
    return this.productImagesService.findAll(productId);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add an image to a product (admin)' })
  @ApiParam({
    name: 'productId',
    example: swaggerExamples.product.response.id,
  })
  @ApiBody({
    type: CreateProductImageDto,
    examples: {
      default: {
        summary: 'Add product image',
        value: swaggerExamples.productImage.createRequest,
      },
    },
  })
  @ApiCreatedResponse({
    type: ProductImageResponseDto,
    schema: { example: swaggerExamples.productImage.response },
  })
  create(
    @Param('productId') productId: string,
    @Body() dto: CreateProductImageDto,
  ) {
    return this.productImagesService.create(productId, dto);
  }

  @Patch('reorder')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Reorder product images (admin)' })
  @ApiParam({
    name: 'productId',
    example: swaggerExamples.product.response.id,
  })
  @ApiBody({
    type: ReorderDto,
    examples: {
      default: {
        summary: 'Reorder product images',
        value: swaggerExamples.productImage.reorderRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ProductImageResponseDto,
    isArray: true,
    schema: { example: swaggerExamples.product.response.images },
  })
  reorder(
    @Param('productId') productId: string,
    @Body() dto: ReorderDto,
  ) {
    return this.productImagesService.reorder(productId, dto.items);
  }

  @Patch(':imageId')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a product image (admin)' })
  @ApiParam({
    name: 'productId',
    example: swaggerExamples.product.response.id,
  })
  @ApiParam({
    name: 'imageId',
    example: swaggerExamples.productImage.response.id,
  })
  @ApiBody({
    type: UpdateProductImageDto,
    examples: {
      default: {
        summary: 'Update product image',
        value: swaggerExamples.productImage.updateRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ProductImageResponseDto,
    schema: { example: swaggerExamples.productImage.response },
  })
  update(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateProductImageDto,
  ) {
    return this.productImagesService.update(productId, imageId, dto);
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a product image (admin)' })
  @ApiParam({
    name: 'productId',
    example: swaggerExamples.product.response.id,
  })
  @ApiParam({
    name: 'imageId',
    example: swaggerExamples.productImage.response.id,
  })
  @ApiNoContentResponse()
  async remove(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ): Promise<void> {
    await this.productImagesService.remove(productId, imageId);
  }
}
