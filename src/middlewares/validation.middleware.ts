import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../exceptions/customError.js';

export const validateSchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Passa o ZodError diretamente para o errorHandler tratar melhor
        next(error);
      } else {
        next(error);
      }
    }
  };
};