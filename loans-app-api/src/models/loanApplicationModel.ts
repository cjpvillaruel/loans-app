enum EmploymentStatus {
    Employed = 'Employed',
    SelfEmployed = 'SelfEmployed',
    Unemployed = 'Unemployed',
}

export interface LoanApplication {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    employmentStatus: EmploymentStatus;
    employerName?: string;

    loanPurpose: string;
    loanTerm: number; // in months
    loanAmount: number;
    depositAmount: number;
}

class LoanApplicationModel {
    private static inquiries: LoanApplication[] = [];

    static createApplication(data: Omit<LoanApplication, 'id'>): LoanApplication {
        const newInquiry: LoanApplication = {
            id: (LoanApplicationModel.inquiries.length + 1).toString(),
            ...data,
        };
        LoanApplicationModel.inquiries.push(newInquiry);
        return newInquiry;
    }

    static getInquiryById(id: string): LoanApplication | undefined {
        return LoanApplicationModel.inquiries.find(inquiry => inquiry.id === id);
    }

    static listInquiries(): LoanApplication[] {
        return LoanApplicationModel.inquiries;
    }
}
export default LoanApplicationModel;