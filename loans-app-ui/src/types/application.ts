export type EmploymentStatus = "employed" | "unemployed" | "self-employed";
export type ApplicationForm = {
  firstName: string;
  lastName: string;
  employmentStatus: EmploymentStatus;
  companyName?: string;
  loanPurpose: string;
  loanAmount: number;
  deposit: number;
  loanTerm: number;
};
