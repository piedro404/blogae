import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../config/logger.js';
import { success } from 'src/utils/response.js';
import { UserRequest, userSchema } from 'src/schemas/user.schema.js';
import { prismaClient } from '@config/database.js';
import { CustomError } from 'src/exceptions/customError.js';
import { HTTP_STATUS } from 'src/utils/constants.js';
import { hashPassword } from 'src/utils/encryption.js';
import { UserRepository } from 'src/repository/user.repository.js';

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserRequest = userSchema(false).parse(req.body);

    let user = await UserRepository.findByEmail(userData.email!);
    if (user) {
      throw new CustomError("User already exists!", HTTP_STATUS.CONFLICT);
    }

    userData.password = await hashPassword(userData.password!);
    user = await UserRepository.createUser(userData);

    return res.json(success('User registered successfully', user));
  } catch (err) {
    return next(err);
  }
}
