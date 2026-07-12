import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { swaggerExamples } from '../common/swagger/api-examples';
import {
  HomepageResponseDto,
  PatchHomepageContentDto,
} from './dto/homepage.dto';
import { HomepageService } from './homepage.service';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get full homepage content (public)' })
  @ApiQuery({
    name: 'publishedOnly',
    required: false,
    type: Boolean,
    description: 'When true, returns only published banners, text sections, and images',
    example: true,
  })
  @ApiOkResponse({
    type: HomepageResponseDto,
    schema: { example: swaggerExamples.homepage.response },
  })
  getHomepage(@Query('publishedOnly') publishedOnly?: string) {
    return this.homepageService.getHomepage(publishedOnly === 'true');
  }

  @Patch()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Patch homepage content (admin)' })
  @ApiBody({
    type: PatchHomepageContentDto,
    examples: {
      default: {
        summary: 'Update hero and existing sections',
        value: swaggerExamples.homepage.patchRequest,
      },
    },
  })
  @ApiOkResponse({
    type: HomepageResponseDto,
    schema: { example: swaggerExamples.homepage.response },
  })
  patchHomepage(@Body() dto: PatchHomepageContentDto) {
    return this.homepageService.patchHomepage(dto);
  }
}
