import { Request, Response } from 'express';
import LoanApplicationService from '../services/loanApplicationService';

export class LoanApplicationController {
  static async getOffers(req: Request, res: Response) {
    try {
      const offers = LoanApplicationService.getOffers(req.body);
      res.status(200).json(offers);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  static async getApplications(req: Request, res: Response) {
    try {
      const applications = LoanApplicationService.getApplications();
      res.status(200).json(applications);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
