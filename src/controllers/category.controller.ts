import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../config/logger.js';
import { success } from 'src/utils/response.js';
import { UserRequest, userSchema } from 'src/schemas/user.schema.js';
import { prismaClient } from '@config/database.js';
import { CustomError } from 'src/exceptions/customError.js';
import { HTTP_STATUS } from 'src/utils/constants.js';
import { hashPassword } from 'src/utils/encryption.js';
import { CategoryRepository } from 'src/repository/category.repository.js';
import { CategoryRequest, categorySchema } from 'src/schemas/category.schema.js';

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryData: CategoryRequest = categorySchema(false).parse(req.body);

    let category = await CategoryRepository.findByName(categoryData.name!);
    if (category) {
      throw new CustomError("Category already exists!", HTTP_STATUS.CONFLICT);
    }

    category = await CategoryRepository.createCategory(categoryData);

    return res.json(success('Category registered successfully', category));
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
    const categories = await CategoryRepository.findAll();

    return res.json(success('Categories retrieved successfully', categories));
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
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId) || categoryId <= 0) {
      throw new CustomError("Invalid category ID", HTTP_STATUS.BAD_REQUEST);
    }

    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    return res.json(success('Category retrieved successfully', category));
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
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId) || categoryId <= 0) {
      throw new CustomError("Invalid category ID", HTTP_STATUS.BAD_REQUEST);
    }

    const categoryData: CategoryRequest = categorySchema(true).parse(req.body);

    if (categoryData.name) {
      const existingCategory = await CategoryRepository.findByName(categoryData.name);

      if (existingCategory && existingCategory.id !== categoryId) {
        throw new CustomError("Category name already in use", HTTP_STATUS.CONFLICT);
      }
    }

    if (categoryData.description) {
      categoryData.description = await hashPassword(categoryData.description);
    }

    const updatedCategory = await CategoryRepository.updateCategory(categoryId, categoryData);

    return res.json(success('Category updated successfully', updatedCategory));
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
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId) || categoryId <= 0) {
      throw new CustomError("Invalid category ID", HTTP_STATUS.BAD_REQUEST);
    }

    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    await CategoryRepository.deleteCategory(categoryId);

    return res.json(success('Category deleted successfully'));
  } catch (err) {
    return next(err);
  }
}