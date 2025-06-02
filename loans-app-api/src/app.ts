import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const cors = require('cors');
import loanApplicationRouter from './routes/loanApplicationRoutes';
import helmet from 'helmet';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));

app.use(express.json());
const helmetSettings = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // Cross-Origin settings
  crossOriginEmbedderPolicy: false, // Set to true in production
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'same-site' },
  originAgentCluster: true,

  // Transport Security
  strictTransportSecurity: {
    maxAge: 15552000, // 180 days
    includeSubDomains: true,
    preload: true,
  },

  // Miscellaneous Security Headers
  xContentTypeOptions: true,
  xDnsPrefetchControl: { allow: false },
  xDownloadOptions: true,
  xFrameOptions: { action: 'deny' },
  xPermittedCrossDomainPolicies: { permittedPolicies: 'none' },
  xXssProtection: true,

  // Remove server fingerprinting
  hidePoweredBy: true,

  // Referrer Policy
  referrerPolicy: { policy: 'no-referrer' },
});

app.use(helmetSettings);

// Routes
app.use('/api/loan-applications', loanApplicationRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
