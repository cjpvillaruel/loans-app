interface Lender {
  id: string;
  name: string;
  interestRate: number; // in decimal
  fees?: LenderFee;
}
export interface LenderFee {
  applicationFee?: number;
  processingFee?: number;
}

class LenderModel {
  private static lenders: Lender[] = [
    {
      id: '1',
      name: 'Lender A',
      interestRate: 5, // 5%
      fees: {
        applicationFee: 100,
      },
    },
    {
      id: '2',
      name: 'Lender B',
      interestRate: 5.5, // 5%
      fees: {
        processingFee: 75,
      },
    },
    {
      id: '3',
      name: 'Lender C',
      interestRate: 6, // 6%
    },
  ];

  static getLenders(): Lender[] {
    return LenderModel.lenders;
  }
}
export default LenderModel;
