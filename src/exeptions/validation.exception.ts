import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line import/prefer-default-export
export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
