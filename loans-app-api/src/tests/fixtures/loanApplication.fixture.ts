export const VALID_LOAN_APPLICATION = {
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'johnDoe@gmail.com',
  employmentStatus: 'employed',
  companyName: 'Tech Solutions',
  loanAmount: 20000,
  depositAmount: 5000,
  loanPurpose: 'vehicle',
  loanTerm: 2,
};

export const WITHOUT_COMPANY_NAME = {
  ...VALID_LOAN_APPLICATION,
  companyName: undefined,
};
