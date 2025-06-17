import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform<T>(value: any, { metatype }: ArgumentMetadata): Promise<T> {
    if (!metatype || !this.toValidate(metatype)) {
      return value as T;
    }

    const object = plainToClass(metatype, value) as object;
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => {
        return Object.values(error.constraints || {}).join(', ');
      });

      throw new BadRequestException(
        `Validation failed: ${errorMessages.join(', ')}`,
      );
    }
    return object as T;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
