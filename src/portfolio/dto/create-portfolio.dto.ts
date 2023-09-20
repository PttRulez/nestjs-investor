import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  compound: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
