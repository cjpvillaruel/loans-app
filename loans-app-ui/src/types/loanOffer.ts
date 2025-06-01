export interface LoanOfferFees {
  applicationFee?: number;
  processingFee?: number;
}

export interface LoanOffer {
  lenderId: string; // Optional, as some offers may not have a company ID
  lenderName: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyRepayment: number;
  fees: LoanOfferFees;
}
