import { store } from '@controllers/user.controller';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    store(req, res, next).catch(next);
});

export default router;
