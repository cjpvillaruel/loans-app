import type { LoanOffer } from "../../types/loanOffer";
import LoanCard from "../molecules/LoanCard";

interface LoanOptionsFormProps {
  loanOffers: LoanOffer[];
  loading?: boolean;
  error: Error | null;
}
const LoanOptionsForm = ({
  loanOffers,
  loading,
  error,
}: LoanOptionsFormProps) => {
  if (error) {
    return <div>Error loading loan options. Please try again.</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (loanOffers.length === 0) {
    return <div>No loan options available</div>;
  }
  return (
    <div>
      {loanOffers.map((offer) => (
        <LoanCard loanOffer={offer} onClick={() => {}} key={offer.lenderName} />
      ))}
    </div>
  );
};
export default LoanOptionsForm;
