import type { LoanOffer } from "../../types/loanOffer";
import LoanCard from "../molecules/LoanCard";

const LoanOptionsForm = () => {
  const loanOptions: LoanOffer[] = [
    {
      companyId: "1",
      companyName: "Bank A",
      loanAmount: 10000,
      interestRate: 0.05,
      loanTerm: 12,
      monthlyPayment: 856.07,
    },
    {
      companyId: "2",
      companyName: "Bank B",
      loanAmount: 15000,
      interestRate: 0.04,
      loanTerm: 24,
      monthlyPayment: 659.96,
    },
  ];
  return (
    <div>
      {loanOptions.map((offer) => (
        <LoanCard loanOffer={offer} onClick={() => {}} key={offer.companyId} />
      ))}
    </div>
  );
};
export default LoanOptionsForm;
