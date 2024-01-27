import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from '../exeptions/validation.exception';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
