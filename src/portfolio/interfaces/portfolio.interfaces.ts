export interface IPortfolio {
  id: number;
  name: string;
  compound: boolean;
  userId: number;
  deals?: Array<string>;
}

export type PortfolioUpdate = Partial<Omit<IPortfolio, 'deals'>> & {
  id: number;
};
