import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({ errors: error.errors });
    }
  };
