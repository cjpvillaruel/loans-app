import LenderModel from '../models/lenderModel';
import LoanApplicationModel, {
  LoanApplication,
} from '../models/loanApplicationModel';
import { Offer } from '../models/offerModel';

function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
): number {
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to decimal

  const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments
  // Calculate monthly payment using the formula
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
}

class LoanApplicationService {
  static getOffers(loanApplication: Omit<LoanApplication, 'id'>): Offer[] {
    const lenders = LenderModel.getLenders();

    LoanApplicationModel.createApplication(loanApplication);
    const offers = lenders.map((lender) => {
      const offer: Offer = {
        lenderId: lender.id,
        lenderName: lender.name,
        interestRate: lender.interestRate,
        fees: lender.fees,
        monthlyRepayment: calculateMonthlyPayment(
          loanApplication.loanAmount,
          lender.interestRate, // Convert decimal to percentage
          loanApplication.loanTerm,
        ),
        loanAmount: loanApplication.loanAmount,
        loanTerm: loanApplication.loanTerm,
      };
      return offer;
    });
    return offers;
  }

  static getApplications(): LoanApplication[] {
    return LoanApplicationModel.listApplications();
  }
}

export const loanApplicationService = new LoanApplicationService();
export default LoanApplicationService;
