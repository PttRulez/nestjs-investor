import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './deal.repository';

@Module({
  providers: [DealService, DealRepository],
  controllers: [DealController],
})
export class DealModule {}
