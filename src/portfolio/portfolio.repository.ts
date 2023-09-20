import { PrismaService } from 'src/prisma/prisma.service';
import { Portfolio } from './models/portfolio.model';
import { PortfolioUpdate } from './interfaces/portfolio.interfaces';
import { IPortfolioRepository } from './interfaces/portfolio.repository.interface';

export class PortfolioRepository implements IPortfolioRepository {
  constructor(private prisma: PrismaService) {
    console.log('PortfolioRepository constructor: ', prisma);
  }

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

    return new Portfolio(
      newPortfolio.id,
      newPortfolio.userId,
      newPortfolio.name,
      newPortfolio.compound,
    );
  }

  async getAll(userId: number): Promise<Portfolio[]> {
    const bdPortfolios = await this.prisma.portfolioModel.findMany({
      where: {
        userId,
      },
    });

    return bdPortfolios.map(
      (p) => new Portfolio(p.id, p.userId, p.name, p.compound),
    );
  }

  async findOne(portfolioId: number): Promise<Portfolio | null> {
    const foundPortfolio = await this.prisma.portfolioModel.findUnique({
      where: { id: portfolioId },
    });
    if (!foundPortfolio) {
      return null;
    }
    return new Portfolio(
      foundPortfolio.id,
      foundPortfolio.userId,
      foundPortfolio.name,
      foundPortfolio.compound,
    );
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
    return new Portfolio(
      updatedPortfolio.id,
      updatedPortfolio.userId,
      updatedPortfolio.name,
      updatedPortfolio.compound,
    );
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
