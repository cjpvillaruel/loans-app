import { LoanApplicationController } from '../../controllers/loanApplicationController';
import LoanApplicationService from '../../services/loanApplicationService';
import { Request, Response } from 'express';

jest.mock('../../services/loanApplicationService');

describe('LoanApplicationController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { body: { amount: 1000, term: 12 } };
    res = {
      status: statusMock,
      json: jsonMock,
    };
    jest.clearAllMocks();
  });

  describe('getOffers', () => {
    it('should return offers and status 200', async () => {
      const offers = [{ id: 1, amount: 1000 }];
      (LoanApplicationService.getOffers as jest.Mock).mockReturnValue(offers);

      await LoanApplicationController.getOffers(
        req as Request,
        res as Response,
      );

      expect(LoanApplicationService.getOffers).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(offers);
    });

    it('should handle errors and return status 400', async () => {
      const error = new Error('Invalid data');
      (LoanApplicationService.getOffers as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await LoanApplicationController.getOffers(
        req as Request,
        res as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getApplications', () => {
    it('should return applications and status 200', async () => {
      const applications = [{ id: 1, status: 'pending' }];
      (LoanApplicationService.getApplications as jest.Mock).mockReturnValue(
        applications,
      );

      await LoanApplicationController.getApplications(
        req as Request,
        res as Response,
      );

      expect(LoanApplicationService.getApplications).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(applications);
    });

    it('should handle errors and return status 400', async () => {
      const error = new Error('Database error');
      (LoanApplicationService.getApplications as jest.Mock).mockImplementation(
        () => {
          throw error;
        },
      );

      await LoanApplicationController.getApplications(
        req as Request,
        res as Response,
      );

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
