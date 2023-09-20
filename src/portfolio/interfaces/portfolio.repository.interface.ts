import { Portfolio } from '../models/portfolio.model';
import { PortfolioUpdate } from './portfolio.interfaces';

export interface IPortfolioRepository {
  create: (
    userId: number,
    name: string,
    compound: boolean,
  ) => Promise<Portfolio>;

  getAll: (userId: number) => Promise<Portfolio[]>;

  findOne: (portfolioId: number) => Promise<Portfolio | null>;

  update: (portfolioUpdateEntity: PortfolioUpdate) => Promise<Portfolio | null>;

  remove: (portfolioId: number) => Promise<boolean>;
}
