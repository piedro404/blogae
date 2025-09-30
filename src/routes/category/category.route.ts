import { store, index, show, update, destroy } from '@controllers/category.controller';
import { Router, Request, Response, NextFunction } from 'express';
import { get } from 'http';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    store(req, res, next).catch(next);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    index(req, res, next).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    show(req, res, next).catch(next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    update(req, res, next).catch(next);
}); 

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    destroy(req, res, next).catch(next);
});

export default router;
