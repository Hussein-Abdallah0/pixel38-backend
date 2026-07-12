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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { swaggerExamples } from '../common/swagger/api-examples';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List products (public)' })
  @ApiQuery({
    name: 'publishedOnly',
    required: false,
    type: Boolean,
    description: 'When true, returns only published products',
    example: true,
  })
  @ApiQuery({
    name: 'includeImages',
    required: false,
    type: Boolean,
    description: 'When true, includes ordered product images',
    example: true,
  })
  @ApiOkResponse({
    type: ProductResponseDto,
    isArray: true,
    schema: { example: [swaggerExamples.product.response] },
  })
  findAll(
    @Query('publishedOnly') publishedOnly?: string,
    @Query('includeImages') includeImages?: string,
  ) {
    return this.productsService.findAll(
      publishedOnly === 'true',
      includeImages === 'true',
    );
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get a product by id or slug (public)' })
  @ApiOkResponse({
    type: ProductResponseDto,
    schema: { example: swaggerExamples.product.response },
  })
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.productsService.findOne(idOrSlug);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a product (admin)' })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      default: {
        summary: 'Create product',
        value: swaggerExamples.product.createRequest,
      },
    },
  })
  @ApiCreatedResponse({
    type: ProductResponseDto,
    schema: { example: swaggerExamples.product.response },
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch('reorder')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Reorder products (admin)' })
  @ApiBody({
    type: ReorderDto,
    examples: {
      default: {
        summary: 'Reorder products',
        value: swaggerExamples.product.reorderRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ProductResponseDto,
    isArray: true,
    schema: { example: [swaggerExamples.product.response] },
  })
  reorder(@Body() dto: ReorderDto) {
    return this.productsService.reorder(dto.items);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a product (admin)' })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      default: {
        summary: 'Update product',
        value: swaggerExamples.product.updateRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ProductResponseDto,
    schema: { example: swaggerExamples.product.response },
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a product (admin)' })
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
