import { Button, Card } from "@mui/material";
import type { LoanOffer } from "../../types/loanOffer";

interface LoanCardProps {
  loanOffer: LoanOffer;
  selected?: boolean;
  onClick: (loanOffer: LoanOffer) => void;
}

const LoanCard = ({ loanOffer, onClick }: LoanCardProps) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <h2>{loanOffer.companyName}</h2>
      <p>Amount: {loanOffer.loanAmount}</p>
      <p>Interest Rate: {loanOffer.interestRate * 100}%</p>
      <p>Term: {loanOffer.loanTerm}</p>
      <Button
        type="button"
        onClick={() => onClick(loanOffer)}
        color="primary"
        variant="outlined"
      >
        Get Loan Offer
      </Button>
    </Card>
  );
};

export default LoanCard;
