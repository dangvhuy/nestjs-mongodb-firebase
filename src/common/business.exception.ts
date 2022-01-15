import {HttpStatus} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';

export class BusinessException extends HttpException {

  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}