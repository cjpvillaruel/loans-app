import { loanApplicationSchema } from '../../schema/loanApplicationSchema';

describe('loanApplicationSchema', () => {
  const validData = {
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'jane.doe@example.com',
    employmentStatus: 'employed',
    companyName: 'Acme Corp',
    loanPurpose: 'Home Renovation',
    loanAmount: 5000,
    depositAmount: 1000,
    loanTerm: 3,
  };

  it('validates a correct application', async () => {
    await expect(
      loanApplicationSchema.validate(validData),
    ).resolves.toBeTruthy();
  });

  it('fails when required fields are missing', async () => {
    const data = { ...validData, firstName: undefined };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'First Name is required',
    );
  });

  it('fails with invalid email', async () => {
    const data = { ...validData, emailAddress: 'not-an-email' };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Invalid Email Address',
    );
  });

  it('fails when employmentStatus is missing', async () => {
    const data = { ...validData, employmentStatus: undefined };

    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Employment Status is required',
    );
  });

  it('fails when employmentStatus is invalid', async () => {
    const data = { ...validData, employmentStatus: 'student' };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow();
  });

  it('requires companyName if employed', async () => {
    const data = { ...validData, companyName: undefined };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Company name is required',
    );
  });

  it('does not require companyName if self-employed', async () => {
    const data = {
      ...validData,
      employmentStatus: 'self-employed',
      companyName: undefined,
    };
    await expect(loanApplicationSchema.validate(data)).resolves.toBeTruthy();
  });

  it('does not require companyName if unemployed', async () => {
    const data = {
      ...validData,
      employmentStatus: 'unemployed',
      companyName: undefined,
    };
    await expect(loanApplicationSchema.validate(data)).resolves.toBeTruthy();
  });

  it('fails if loanAmount is below minimum', async () => {
    const data = { ...validData, loanAmount: 1000 };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Minimum loan amount is $2000',
    );
  });

  it('fails if depositAmount is negative', async () => {
    const data = { ...validData, depositAmount: -10 };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Deposit cannot be negative',
    );
  });

  it('fails if depositAmount exceeds loanAmount', async () => {
    const data = { ...validData, depositAmount: 6000 };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Deposit cannot exceed loan amount',
    );
  });

  it('fails if loanTerm is below minimum', async () => {
    const data = { ...validData, loanTerm: 0 };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Minimum loan term is 1 year',
    );
  });

  it('fails if loanTerm is above maximum', async () => {
    const data = { ...validData, loanTerm: 8 };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Maximum loan term is 7 years',
    );
  });

  it('fails if loanAmount is not a number', async () => {
    const data = { ...validData, loanAmount: 'abc' as any };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Loan Amount must be a number',
    );
  });

  it('fails if depositAmount is not a number', async () => {
    const data = { ...validData, depositAmount: 'xyz' as any };
    await expect(loanApplicationSchema.validate(data)).rejects.toThrow(
      'Deposit must be a number',
    );
  });
});
