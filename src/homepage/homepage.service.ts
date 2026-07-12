import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Banner,
  HeroSection,
  HomepageImage,
  Prisma,
  TextSection,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBannerDto,
  CreateHomepageImageDto,
  CreateTextSectionDto,
  HomepageResponseDto,
  UpdateBannerDto,
  UpdateHeroDto,
  UpdateHomepageImageDto,
  UpdateTextSectionDto,
  PatchHomepageContentDto,
} from './dto/homepage.dto';

const HERO_ID = 'homepage-hero';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomepage(publishedOnly = false): Promise<HomepageResponseDto> {
    const publishedFilter = publishedOnly ? { isPublished: true } : {};

    const [hero, banners, textSections, images] = await Promise.all([
      this.prisma.heroSection.findUnique({ where: { id: HERO_ID } }),
      this.prisma.banner.findMany({
        where: publishedFilter,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.textSection.findMany({
        where: publishedFilter,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.homepageImage.findMany({
        where: publishedFilter,
        orderBy: { sortOrder: 'asc' },
      }),
    ]);

    return { hero, banners, textSections, images };
  }

  async patchHomepage(dto: PatchHomepageContentDto): Promise<HomepageResponseDto> {
    if (dto.hero) {
      await this.upsertHero(dto.hero);
    }

    if (dto.banners?.length) {
      await Promise.all(
        dto.banners.map(({ id, ...data }) => this.updateBanner(id, data)),
      );
    }

    if (dto.textSections?.length) {
      await Promise.all(
        dto.textSections.map(({ id, ...data }) =>
          this.updateTextSection(id, data),
        ),
      );
    }

    if (dto.images?.length) {
      await Promise.all(
        dto.images.map(({ id, ...data }) => this.updateHomepageImage(id, data)),
      );
    }

    return this.getHomepage();
  }

  getHero(): Promise<HeroSection | null> {
    return this.prisma.heroSection.findUnique({ where: { id: HERO_ID } });
  }

  upsertHero(dto: UpdateHeroDto): Promise<HeroSection> {
    return this.prisma.heroSection.upsert({
      where: { id: HERO_ID },
      create: { id: HERO_ID, ...dto },
      update: dto,
    });
  }

  findBanners(publishedOnly = false): Promise<Banner[]> {
    const where: Prisma.BannerWhereInput = publishedOnly
      ? { isPublished: true }
      : {};

    return this.prisma.banner.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findBanner(id: string): Promise<Banner> {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`Banner with id "${id}" not found`);
    }
    return banner;
  }

  createBanner(dto: CreateBannerDto): Promise<Banner> {
    return this.prisma.banner.create({ data: dto });
  }

  async updateBanner(id: string, dto: UpdateBannerDto): Promise<Banner> {
    await this.findBanner(id);
    return this.prisma.banner.update({ where: { id }, data: dto });
  }

  async removeBanner(id: string): Promise<Banner> {
    await this.findBanner(id);
    return this.prisma.banner.delete({ where: { id } });
  }

  async reorderBanners(
    items: { id: string; sortOrder: number }[],
  ): Promise<Banner[]> {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.banner.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.findBanners();
  }

  findTextSections(publishedOnly = false): Promise<TextSection[]> {
    const where: Prisma.TextSectionWhereInput = publishedOnly
      ? { isPublished: true }
      : {};

    return this.prisma.textSection.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findTextSection(id: string): Promise<TextSection> {
    const section = await this.prisma.textSection.findUnique({ where: { id } });
    if (!section) {
      throw new NotFoundException(`Text section with id "${id}" not found`);
    }
    return section;
  }

  async createTextSection(dto: CreateTextSectionDto): Promise<TextSection> {
    const existing = await this.prisma.textSection.findUnique({
      where: { key: dto.key },
    });
    if (existing) {
      throw new ConflictException(`Text section key "${dto.key}" already exists`);
    }
    return this.prisma.textSection.create({ data: dto });
  }

  async updateTextSection(
    id: string,
    dto: UpdateTextSectionDto,
  ): Promise<TextSection> {
    await this.findTextSection(id);

    if (dto.key) {
      const existing = await this.prisma.textSection.findFirst({
        where: { key: dto.key, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException(`Text section key "${dto.key}" already exists`);
      }
    }

    return this.prisma.textSection.update({ where: { id }, data: dto });
  }

  async removeTextSection(id: string): Promise<TextSection> {
    await this.findTextSection(id);
    return this.prisma.textSection.delete({ where: { id } });
  }

  async reorderTextSections(
    items: { id: string; sortOrder: number }[],
  ): Promise<TextSection[]> {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.textSection.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.findTextSections();
  }

  findHomepageImages(publishedOnly = false): Promise<HomepageImage[]> {
    const where: Prisma.HomepageImageWhereInput = publishedOnly
      ? { isPublished: true }
      : {};

    return this.prisma.homepageImage.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findHomepageImage(id: string): Promise<HomepageImage> {
    const image = await this.prisma.homepageImage.findUnique({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Homepage image with id "${id}" not found`);
    }
    return image;
  }

  createHomepageImage(dto: CreateHomepageImageDto): Promise<HomepageImage> {
    return this.prisma.homepageImage.create({ data: dto });
  }

  async updateHomepageImage(
    id: string,
    dto: UpdateHomepageImageDto,
  ): Promise<HomepageImage> {
    await this.findHomepageImage(id);
    return this.prisma.homepageImage.update({ where: { id }, data: dto });
  }

  async removeHomepageImage(id: string): Promise<HomepageImage> {
    await this.findHomepageImage(id);
    return this.prisma.homepageImage.delete({ where: { id } });
  }

  async reorderHomepageImages(
    items: { id: string; sortOrder: number }[],
  ): Promise<HomepageImage[]> {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.homepageImage.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return this.findHomepageImages();
  }
}
