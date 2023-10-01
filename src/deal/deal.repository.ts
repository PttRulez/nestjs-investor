import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDealData } from './types';
import { Deal } from './deal.model';

@Injectable()
export class DealRepository {
  constructor(private prisma: PrismaService) {}

  async create(dealData: CreateDealData) {
    const newDealFromDb = await this.prisma.deal.create({
      data: { ...dealData },
      include: {
        portfolio: true,
      },
    });

    return new Deal(newDealFromDb);
  }
}
