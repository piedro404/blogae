import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../config/logger.js';
import { success } from 'src/utils/response.js';
import { UserRequest, userSchema } from 'src/schemas/user.schema.js';
import { prismaClient } from '@config/database.js';
import { CustomError } from 'src/exceptions/customError.js';
import { HTTP_STATUS } from 'src/utils/constants.js';
import { hashPassword } from 'src/utils/encryption.js';
import UserRepository from 'src/repository/user.repository.js';

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

export async function index(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserRepository.findAll();

    return res.json(success('Users retrieved successfully', users));
  } catch (err) {
    return next(err);
  }
}

export async function show(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId) || userId <= 0) {
      throw new CustomError("Invalid user ID", HTTP_STATUS.BAD_REQUEST);
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new CustomError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return res.json(success('User retrieved successfully', user));
  } catch (err) {
    return next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId) || userId <= 0) {
      throw new CustomError("Invalid user ID", HTTP_STATUS.BAD_REQUEST);
    }

    const userData: UserRequest = userSchema(true).parse(req.body);

    if (userData.email) {
      const existingUser = await UserRepository.findByEmail(userData.email);

      if (existingUser && existingUser.id !== userId) {
        throw new CustomError("Email already in use", HTTP_STATUS.CONFLICT);
      }
    }

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    const updatedUser = await UserRepository.updateUser(userId, userData);

    return res.json(success('User updated successfully', updatedUser));
  } catch (err) {
    return next(err);
  }
}

export async function destroy(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId) || userId <= 0) {
      throw new CustomError("Invalid user ID", HTTP_STATUS.BAD_REQUEST);
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new CustomError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    await UserRepository.deleteUser(userId);

    return res.json(success('User deleted successfully'));
  } catch (err) {
    return next(err);
  }
}