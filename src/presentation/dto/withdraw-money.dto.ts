import { IsNumber, IsPositive } from 'class-validator';

export class WithdrawMoneyDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
