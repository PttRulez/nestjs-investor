import { Portfolio } from './models/portfolio.model';
import { PortfolioUpdate } from './interfaces/portfolio.interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    name: string,
    compound: boolean,
  ): Promise<Portfolio> {
    const newPortfolio = await this.prisma.portfolioModel.create({
      data: {
        userId,
        name,
        compound,
      },
    });

    return new Portfolio(newPortfolio);
  }

  async getAll(userId: number): Promise<Portfolio[]> {
    const bdPortfolios = await this.prisma.portfolioModel.findMany({
      where: {
        userId,
      },
    });

    return bdPortfolios.map((p) => new Portfolio(p));
  }

  async findOne(portfolioId: number): Promise<Portfolio | null> {
    const foundPortfolio = await this.prisma.portfolioModel.findUnique({
      where: { id: portfolioId },
    });
    if (!foundPortfolio) {
      return null;
    }
    return new Portfolio(foundPortfolio);
  }

  async update(data: PortfolioUpdate): Promise<Portfolio | null> {
    const updatedPortfolio = await this.prisma.portfolioModel.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });

    if (!updatedPortfolio) {
      return null;
    }
    return new Portfolio(updatedPortfolio);
  }

  async remove(portfolioId: number): Promise<boolean> {
    const deleted = await this.prisma.portfolioModel.delete({
      where: {
        id: portfolioId,
      },
    });

    if (!deleted) {
      return false;
    }
    return true;
  }
}
