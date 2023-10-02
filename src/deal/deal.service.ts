import { Injectable } from '@nestjs/common';
import { DealRepository } from './deal.repository';
import { CreateDealData } from './types';
import { Exchange } from 'src/common/enums';
import { MoexRepository } from 'src/moex/moex.repository';
import { MoexApi } from 'src/moex/moex-api.service';

@Injectable()
export class DealService {
  constructor(
    private dealRepository: DealRepository,
    private moexRepository: MoexRepository,
    private moexApi: MoexApi,
  ) {}

  async create(
    exchange: Exchange,
    ticker: string,
    dealData: Omit<CreateDealData, 'securityId'>,
  ) {
    // check by exchange property from which table u get security
    const security = await this.moexRepository.findByTicker(ticker);

    if (!security) {
      const a = this.moexApi.getSecurityByTicker(ticker);
      console.log('aaa', a);
    }
    return;
    // get security from securities table of the exchange by ticker
    const securityId = 1;
    return this.dealRepository.create({ ...dealData, securityId });
  }
}
