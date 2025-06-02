import app from '../app';
import {
  VALID_LOAN_APPLICATION,
  WITHOUT_COMPANY_NAME,
} from './fixtures/loanApplication.fixture';

import request from 'supertest';

describe('POST /api/loan-applications/offers', () => {
  it('should return loan application offers', async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send(VALID_LOAN_APPLICATION);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it("should return 200 when company name is not required for 'self-employed'", async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send({
        ...VALID_LOAN_APPLICATION,
        employmentStatus: 'self-employed',
        companyName: undefined,
      });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it('should return 400 for loan application with no company name and employed', async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send(WITHOUT_COMPANY_NAME);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(['Company name is required']);
  });

  it('should return 400 for missing loanAmount', async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send({ ...VALID_LOAN_APPLICATION, loanAmount: undefined });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(['Loan Amount is required']);
  });

  it('should return 400 for loanAmount less than 2000', async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send({ ...VALID_LOAN_APPLICATION, loanAmount: 200, depositAmount: 0 });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(['Minimum loan amount is $2000']);
  });

  it('should return 400 for depositAmount greater than loanAmount', async () => {
    const response = await request(app)
      .post('/api/loan-applications/offers')
      .send({ ...VALID_LOAN_APPLICATION, depositAmount: 25000 });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(['Deposit cannot exceed loan amount']);
  });
});
