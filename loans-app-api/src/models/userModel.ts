export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  companyName?: string; // Optional for unemployed or self-employed
}

export type EmploymentStatus = 'employed' | 'unemployed' | 'self-employed';
