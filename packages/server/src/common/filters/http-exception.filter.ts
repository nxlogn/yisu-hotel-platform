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

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      
      // 处理 NestJS 标准异常响应
      if (typeof res === 'object' && res !== null && 'message' in res) {
        const msg = (res as any).message;
        message = Array.isArray(msg) ? msg.join(', ') : msg;
      } else if (typeof res === 'string') {
        message = res;
      }
    } else if (exception instanceof Error) {
        // 开发环境下打印错误日志
        console.error(exception);
        message = exception.message;
    }

    const errorResponse: ApiResponse<null> = {
      code: status,
      msg: message,
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
