import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@yisu/shared';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 判断是否为http异常，否则视为500服务器错误
    const status = 
      exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 
      exception instanceof HttpException
      ? exception.message
      : 'Internal server error';
    
    // 构造统一的错误响应
    const errorResponse: ApiResponse<null> = {
      code: status, // 非200表示异常
      msg: message,
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
