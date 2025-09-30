export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly description?: string;

  constructor(message: string, statusCode: number, description?: string) {
    super(message);
    this.statusCode = statusCode;
    this.description = description;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, description?: string) {
    super(message, 400, description);
  }
}

export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}
