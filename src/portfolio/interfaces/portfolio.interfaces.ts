import { Portfolio } from '../models/portfolio.model';

export type PortfolioUpdate = Partial<Portfolio> & {
  id: number;
};
