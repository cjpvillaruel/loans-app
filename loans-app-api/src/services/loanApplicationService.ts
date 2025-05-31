import LenderModel from "../models/lenderModel";
import { LoanApplication } from "../models/loanApplicationModel";
import { Offer } from "../models/offerModel";

class LoanApplicationService {
    static getOffers(loanApplication: Omit<LoanApplication, 'id'>): Offer[] {
        const lenders = LenderModel.getLenders();
        
        const offers = lenders.map((lender) => {
            const offer: Offer = {
                lenderId: lender.id,
                lenderName: lender.name,
                interestRate: lender.interestRate,
                fees: lender.fees, 
                monthlyRepayment: (loanApplication.loanAmount + lender.fees) * (lender.interestRate / 12),
            }
            return offer;
        })  
        return offers;
    }
}

export const loanApplicationService = new LoanApplicationService();
export default LoanApplicationService;