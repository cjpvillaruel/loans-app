import LenderModel, { LenderFee } from '../../models/lenderModel';

describe('LenderModel', () => {
  it('should return all lenders', () => {
    const lenders = LenderModel.getLenders();
    expect(Array.isArray(lenders)).toBe(true);
    expect(lenders.length).toBe(3);
  });

  it('should match lender data for Lender A', () => {
    const lenderA = LenderModel.getLenders().find((l) => l.id === '1');
    expect(lenderA).toBeDefined();
    expect(lenderA?.name).toBe('Lender A');
    expect(lenderA?.interestRate).toBe(5);
    expect(lenderA?.fees).toEqual({ applicationFee: 100 });
  });

  it('should match lender data for Lender B', () => {
    const lenderB = LenderModel.getLenders().find((l) => l.id === '2');
    expect(lenderB).toBeDefined();
    expect(lenderB?.name).toBe('Lender B');
    expect(lenderB?.interestRate).toBe(5.5);
    expect(lenderB?.fees).toEqual({ processingFee: 75 });
  });

  it('should match lender data for Lender C', () => {
    const lenderC = LenderModel.getLenders().find((l) => l.id === '3');
    expect(lenderC).toBeDefined();
    expect(lenderC?.name).toBe('Lender C');
    expect(lenderC?.interestRate).toBe(6);
    expect(lenderC?.fees).toBeUndefined();
  });
});
