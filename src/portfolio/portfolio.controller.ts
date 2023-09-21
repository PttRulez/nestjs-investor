import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioUpdate } from './interfaces/portfolio.interfaces';

@Controller('portfolios')
export class PortfolioController {
  userId: number = 1; // получать юзера через декоратор видимо будем позже, когда сделаем авторизацию
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(this.userId, dto.name, dto.compound);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll(this.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') portfolioId: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const dataForUpdate: PortfolioUpdate = {
      id: Number(portfolioId),
      ...updatePortfolioDto,
    };
    return this.portfolioService.update(dataForUpdate);
  }

  @Delete(':id')
  remove(@Param('id') portfolioId: string) {
    return this.portfolioService.remove(Number(portfolioId));
  }
}
