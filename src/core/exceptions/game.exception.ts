import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessage } from './http.exception';

export class GameNotFoundException extends HttpException {
  constructor(message: HttpExceptionMessage = { message: 'Game Not Found' }) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
