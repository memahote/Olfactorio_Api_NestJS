import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatabaseError } from 'pg';
import { Response } from 'express';
import { DrizzleQueryError } from 'drizzle-orm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception)
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (exception instanceof DrizzleQueryError) {
      const cause = exception.cause as DatabaseError;

      if (cause.code === '23505') {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Resource already exists',
          error: 'Conflict',
        });
      }
    }
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
