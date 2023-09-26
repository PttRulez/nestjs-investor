import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PortfolioModule,
    PrismaModule,
  ],
})
export class AppModule {}
