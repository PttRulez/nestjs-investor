import { IPortfolio } from '../interfaces/portfolio.interfaces';

export class Portfolio implements IPortfolio {
  constructor(
    private readonly _id: number,
    private readonly _userId: number,
    private readonly _name: string,
    private readonly _compound: boolean,
    private readonly _deals?: Array<string>, // потом создам модель Deal и это будет массив из таких моделей
  ) {
    // массив сделок планирую получать из репозитария сделок по айдигник портфолио
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get userId() {
    return this._userId;
  }

  get compound() {
    return this._compound;
  }

  get deals() {
    return this._deals;
  }
}
