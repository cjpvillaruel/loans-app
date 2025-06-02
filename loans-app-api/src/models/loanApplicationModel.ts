import { v4 as uuidv4 } from 'uuid';
import { EmploymentStatus } from './userModel';

export interface LoanApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  employerName?: string;

  loanPurpose: string;
  loanTerm: number; // in years
  loanAmount: number;
  depositAmount: number;
}

class LoanApplicationModel {
  private static applications: LoanApplication[] = [];

  static createApplication(data: Omit<LoanApplication, 'id'>): LoanApplication {
    const newInquiry: LoanApplication = {
      id: uuidv4(),
      ...data,
    };
    LoanApplicationModel.applications.push(newInquiry);
    return newInquiry;
  }

  static getApplicationById(id: string): LoanApplication | undefined {
    return LoanApplicationModel.applications.find(
      (inquiry) => inquiry.id === id,
    );
  }

  static listApplications(): LoanApplication[] {
    return LoanApplicationModel.applications;
  }
}
export default LoanApplicationModel;
