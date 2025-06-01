import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes/userRoutes';
const cors = require('cors');
import loanApplicationRouter from './routes/loanApplicationRoutes';

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'], // Allow requests from example.com and localhost:3001
};

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// Routes
app.use('/api/users', router);
app.use('/api/loanApplications', loanApplicationRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
