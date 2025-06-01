import { Button, Card } from "@mui/material";
import type { LoanOffer } from "../../types/loanOffer";

interface LoanCardProps {
  loanOffer: LoanOffer;
  selected?: boolean;
  onClick: (loanOffer: LoanOffer) => void;
}

const FEE_MAPPER: Record<string, string> = {
  applicationFee: "Application Fee",
  processingFee: "Processing Fee",
};

const LoanCard = ({ loanOffer, onClick }: LoanCardProps) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <h2>{loanOffer.lenderName}</h2>
      <p>Monthly Repayment: ${loanOffer.monthlyRepayment.toFixed(2)}</p>
      <p>Interest Rate: {loanOffer.interestRate}%</p>
      <p>Term: {loanOffer.loanTerm}</p>
      <div>
        Fees:
        {loanOffer.fees ? (
          Object.entries(loanOffer.fees).map(([key, value]) => (
            <p style={{ margin: 0 }} key={key}>
              {FEE_MAPPER[key] ?? ""}: ${value.toFixed(2)}
            </p>
          ))
        ) : (
          <p style={{ margin: 0 }}>No Fees</p>
        )}
      </div>
      <Button
        style={{ marginTop: 16 }}
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
