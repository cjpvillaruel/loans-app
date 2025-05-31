export interface Offer {
    lenderId: string;
    lenderName: string;
    interestRate: number; // in decimal
    fees: number; // in currency units
    monthlyRepayment: number; // in currency units
}