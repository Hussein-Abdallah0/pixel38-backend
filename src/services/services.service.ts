import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Service } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(publishedOnly = false): Promise<Service[]> {
    const where: Prisma.ServiceWhereInput = publishedOnly
      ? { isPublished: true }
      : {};

    return this.prisma.service.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found`);
    }

    return service;
  }

  create(dto: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({ data: dto });
  }

  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    await this.findOne(id);
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<Service> {
    await this.findOne(id);
    return this.prisma.service.delete({ where: { id } });
  }

  async reorder(items: { id: string; sortOrder: number }[]): Promise<Service[]> {
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.service.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    return this.findAll();
  }
}
