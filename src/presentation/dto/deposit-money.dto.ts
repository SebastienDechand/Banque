import { IsNumber, IsPositive } from 'class-validator';

export class DepositMoneyDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
