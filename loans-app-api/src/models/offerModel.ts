import { LenderFee } from './lenderModel';

export interface Offer {
  lenderId: string;
  lenderName: string;
  interestRate: number; // in decimal
  fees?: LenderFee;
  monthlyRepayment: number; // in currency units
  loanAmount: number; // in currency units
  loanTerm: number; // in years
}
