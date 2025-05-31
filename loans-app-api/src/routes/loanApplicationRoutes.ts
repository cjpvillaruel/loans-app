import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { LoanApplicationController } from '../controllers/loanApplicationController';


const loanApplicationRouter = Router();

loanApplicationRouter.post('/offers', LoanApplicationController.getOffers);

export default loanApplicationRouter;