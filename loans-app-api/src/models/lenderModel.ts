interface Lender {
    id: string;
    name: string;
    interestRate: number; // in decimal 
    fees: number;
}

class LenderModel {
    private static inquiries: Lender[] = [{
        id: '1',
        name: 'Lender A',
        interestRate: 0.055, // 5%
        fees: 100
    }, {
        id: '2',
        name: 'Lender B',
        interestRate: 0.5, // 5%
        fees: 150   
    }, {
        id: '3',
        name: 'Lender C',
        interestRate: 0.06, // 6%
        fees: 200
    }];

    static getLenders(): Lender[] {
        return LenderModel.inquiries;
    }
}
export default LenderModel;