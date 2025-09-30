import { Request, Response, NextFunction, response } from 'express';
import { logger } from '../config/logger.js';
import { success } from 'src/utils/response.js';
import { CustomError } from 'src/exceptions/customError.js';
import { HTTP_STATUS } from 'src/utils/constants.js';
import PostRepository from 'src/repository/post.repository.js';
import { PostRequest, postSchema } from 'src/schemas/post.schema.js';

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const postData: PostRequest = postSchema(false).parse(req.body);
    let post = await PostRepository.createPost(postData);

    return res.json(success('Post registered successfully', post));
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
    const posts = await PostRepository.findAll();

    return res.json(success('Posts retrieved successfully', posts));
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
    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId) || postId <= 0) {
      throw new CustomError("Invalid post ID", HTTP_STATUS.BAD_REQUEST);
    }

    const post = await PostRepository.findById(postId);
    if (!post) {
      throw new CustomError("Post not found", HTTP_STATUS.NOT_FOUND);
    }

    return res.json(success('Post retrieved successfully', post));
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
    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId) || postId <= 0) {
      throw new CustomError("Invalid post ID", HTTP_STATUS.BAD_REQUEST);
    }

    const postData: PostRequest = postSchema(true).parse(req.body);
    const updatedPost = await PostRepository.updatePost(postId, postData);

    return res.json(success('Post updated successfully', updatedPost));
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
    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId) || postId <= 0) {
      throw new CustomError("Invalid post ID", HTTP_STATUS.BAD_REQUEST);
    }

    const post = await PostRepository.findById(postId);
    if (!post) {
      throw new CustomError("Post not found", HTTP_STATUS.NOT_FOUND);
    }

    await PostRepository.deletePost(postId);

    return res.json(success('Post deleted successfully'));
  } catch (err) {
    return next(err);
  }
}