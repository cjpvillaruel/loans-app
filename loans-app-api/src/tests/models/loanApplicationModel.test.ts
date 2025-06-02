import LoanApplicationModel, {
  LoanApplication,
} from '../../models/loanApplicationModel';

describe('LoanApplicationModel', () => {
  beforeEach(() => {
    LoanApplicationModel['applications'] = [];
  });

  const baseData: Omit<LoanApplication, 'id'> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    employmentStatus: 'employed',
    employerName: 'Acme Corp',
    loanPurpose: 'Home Renovation',
    loanTerm: 5,
    loanAmount: 100000,
    depositAmount: 20000,
  };

  it('should create a new loan application and assign an id', () => {
    const application = LoanApplicationModel.createApplication(
      baseData as LoanApplication,
    );
    expect(application).toHaveProperty('id');
    expect(application.firstName).toBe(baseData.firstName);
    expect(application.loanAmount).toBe(baseData.loanAmount);
  });

  it('should list all loan applications', () => {
    LoanApplicationModel.createApplication(baseData);
    LoanApplicationModel.createApplication({
      ...baseData,
      email: 'jane@example.com',
      firstName: 'Jane',
    });
    const applications = LoanApplicationModel.listApplications();
    expect(applications.length).toBe(2);
    expect(applications[0].firstName).toBe('John');
    expect(applications[1].firstName).toBe('Jane');
  });

  it('should get application by id', () => {
    const application = LoanApplicationModel.createApplication(baseData);
    const found = LoanApplicationModel.getApplicationById(application.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(application.id);
  });

  it('should return undefined for non-existent application id', () => {
    const found = LoanApplicationModel.getApplicationById('non-existent-id');
    expect(found).toBeUndefined();
  });

  it('should allow creating application without employerName if not employed', () => {
    const data: Omit<LoanApplication, 'id'> = {
      ...baseData,
      employmentStatus: 'unemployed',
      employerName: undefined,
    };
    const application = LoanApplicationModel.createApplication(data);
    expect(application.employerName).toBeUndefined();
    expect(application.employmentStatus).toBe('unemployed');
  });
});
