import { Module } from '@nestjs/common';
import { MoexApi } from './moex-api.service';

@Module({
  providers: [MoexApi],
})
export class MoexModule {}
