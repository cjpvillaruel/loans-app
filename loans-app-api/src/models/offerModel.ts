import { LenderFee } from './lenderModel';

export interface Offer {
  lenderId: string;
  lenderName: string;
  interestRate: number;
  fees?: LenderFee;
  monthlyRepayment: number;
  loanAmount: number;
  loanTerm: number; // in years
}
