import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { Portfolio } from './models/portfolio.model';
import { PortfolioUpdate } from './interfaces/portfolio.interfaces';

@Injectable()
export class PortfolioService {
  constructor(private portfolioRepository: PortfolioRepository) {}

  create(userId: number, name: string, compound: boolean): Promise<Portfolio> {
    return this.portfolioRepository.create(userId, name, compound);
  }

  findAll(userId: number) {
    return this.portfolioRepository.getAll(userId);
  }

  findOne(portfolioId: number) {
    return this.portfolioRepository.findOne(portfolioId);
  }

  update(data: PortfolioUpdate) {
    return this.portfolioRepository.update(data);
  }

  remove(portfolioId: number) {
    return this.portfolioRepository.remove(portfolioId);
  }
}
