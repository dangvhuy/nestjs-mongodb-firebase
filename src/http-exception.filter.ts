import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {isObject} from '@nestjs/common/utils/shared.utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const {httpAdapter} = this.httpAdapterHost;
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const ctx = host.switchToHttp();
    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      errorMessages: this.getErrorMessages(exception)
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  getErrorMessages(exception: unknown) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (isObject(response)) {
        return response['message'];
      }
      return [response];
    }
    return 'unknown error';
  }
}