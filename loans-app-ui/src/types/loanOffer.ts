export interface LoanOffer {
  companyId: string; // Optional, as some offers may not have a company ID
  companyName: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}
