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
  CreateServiceDto,
  ServiceResponseDto,
  UpdateServiceDto,
} from './dto/service.dto';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List services (public)' })
  @ApiQuery({
    name: 'publishedOnly',
    required: false,
    type: Boolean,
    description: 'When true, returns only published services',
    example: true,
  })
  @ApiOkResponse({
    type: ServiceResponseDto,
    isArray: true,
    schema: { example: [swaggerExamples.service.response] },
  })
  findAll(@Query('publishedOnly') publishedOnly?: string) {
    return this.servicesService.findAll(publishedOnly === 'true');
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a service by id (public)' })
  @ApiOkResponse({
    type: ServiceResponseDto,
    schema: { example: swaggerExamples.service.response },
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a service (admin)' })
  @ApiBody({
    type: CreateServiceDto,
    examples: {
      default: {
        summary: 'Create service',
        value: swaggerExamples.service.createRequest,
      },
    },
  })
  @ApiCreatedResponse({
    type: ServiceResponseDto,
    schema: { example: swaggerExamples.service.response },
  })
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Patch('reorder')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Reorder services (admin)' })
  @ApiBody({
    type: ReorderDto,
    examples: {
      default: {
        summary: 'Reorder services',
        value: swaggerExamples.service.reorderRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ServiceResponseDto,
    isArray: true,
    schema: { example: [swaggerExamples.service.response] },
  })
  reorder(@Body() dto: ReorderDto) {
    return this.servicesService.reorder(dto.items);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a service (admin)' })
  @ApiBody({
    type: UpdateServiceDto,
    examples: {
      default: {
        summary: 'Update service',
        value: swaggerExamples.service.updateRequest,
      },
    },
  })
  @ApiOkResponse({
    type: ServiceResponseDto,
    schema: { example: swaggerExamples.service.response },
  })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a service (admin)' })
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.servicesService.remove(id);
  }
}
