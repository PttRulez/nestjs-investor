import { Injectable } from '@nestjs/common';
import { DealRepository } from './deal.repository';
import { CreateDealData } from './types';
import { Exchange } from 'src/common/enums';

@Injectable()
export class DealService {
  constructor(private dealRepository: DealRepository) {}

  create(
    exchange: Exchange,
    ticker: string,
    dealData: Omit<CreateDealData, 'securityId'>,
  ) {
    // check by exchange property from which table u get security
    // get security from securities table of the exchange by ticker
    const securityId = 1;
    return this.dealRepository.create({ ...dealData, securityId });
  }
}
