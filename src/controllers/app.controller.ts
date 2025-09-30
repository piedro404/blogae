import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../config/logger.js';
import { success } from 'src/utils/response.js';

export async function home(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const response = success(
            'API is running',
            {
                name: 'blogAE',
                version: '1.0.0',
                description: 'API para um blog simples',
                authors: [{
                    name: 'Pedro Henrique Martins Borges',
                    github: 'https://github.com/piedro404',
                    picture: 'https://avatars.githubusercontent.com/u/88720549?v=4'
                }],
            }
        );

        return res.json(response);
    } catch (err) {
        return next(err);
    }
}
