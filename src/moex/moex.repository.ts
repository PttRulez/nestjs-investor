import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoexRepository {
  constructor(private prisma: PrismaService) {}

  async create() {}

  async findByTicker(ticker: string) {
    const foundSec = await this.prisma.moexSecurities.findUnique({
      where: {
        ticker,
      },
    });

    console.log('foundSec', foundSec);
    return foundSec;
  }
}
