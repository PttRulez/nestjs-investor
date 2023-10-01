import { PortfolioWithRelations } from './types';
import { Portfolio as PrismaPortfolio } from '@prisma/client';
import { Cashout } from '../cashout/cashout.model';
import { Deposit } from '../deposit/deposit.model';
import { Deal } from 'src/deal/deal.model';

export class Portfolio {
  id: number;
  userId: number;
  name: string;
  compound: boolean;
  deposits?: Array<Deposit>;
  cashouts?: Array<Cashout>;
  deals?: Array<Deal>;

  constructor(dbModel: PrismaPortfolio);
  constructor(dbModel: PortfolioWithRelations) {
    this.id = dbModel.id;
    this.name = dbModel.name;
    this.compound = dbModel.compound;
    this.userId = dbModel.userId;

    if (dbModel.deposits) {
      this.deposits = dbModel.deposits.map((d) => new Deposit(d));
    }

    if (dbModel.cashouts) {
      this.cashouts = dbModel.cashouts.map((c) => new Cashout(c));
    }

    if (dbModel.deals) {
      this.deals = dbModel.deals.map((d) => new Deal(d));
    }
  }

  belongsToUser(userId: number) {
    return userId === this.userId;
  }

  toJSON() {
    const json: Record<string, any> = {
      id: this.id,
      name: this.name,
      compound: this.compound,
    };

    if (this.deposits) {
      json.deposits = this.deposits;
    }

    if (this.cashouts) {
      json.cashouts = this.cashouts;
    }

    if (this.deals) {
      json.deals = this.deals;
    }

    return json;
  }
}
