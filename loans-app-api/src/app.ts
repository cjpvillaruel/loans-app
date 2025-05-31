
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes/userRoutes';
import loanApplicationRouter from './routes/loanApplicationRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', router);
app.use('/api/loanApplications', loanApplicationRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;