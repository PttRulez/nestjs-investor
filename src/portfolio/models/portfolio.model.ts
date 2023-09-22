import { PortfolioModel } from '@prisma/client';

export class Portfolio {
  id: number;
  userId: number;
  name: string;
  compound: boolean;

  constructor(bdModel: PortfolioModel) {
    this.id = bdModel.id;
    this.name = bdModel.name;
    this.compound = bdModel.compound;
    this.userId = bdModel.userId;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      compound: this.compound,
    };
  }
}
