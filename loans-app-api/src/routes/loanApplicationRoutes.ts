import { Router } from 'express';
import { LoanApplicationController } from '../controllers/loanApplicationController';
import { validate } from '../middlewares/validationHandler';
import { loanApplicationSchema } from '../schema/loanApplicationSchema';

const loanApplicationRouter = Router();

loanApplicationRouter.post(
  '/offers',
  validate(loanApplicationSchema),
  LoanApplicationController.getOffers,
);

export default loanApplicationRouter;
