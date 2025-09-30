import { home } from '@controllers/app.controller';
import { Router, Request, Response, NextFunction } from 'express';
import userRouter from './user/user.route';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    home(req, res, next).catch(next);
});

router.use('/users', userRouter);

export default router;
