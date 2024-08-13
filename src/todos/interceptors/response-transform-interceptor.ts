import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<TemplateStringsArray, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentStatusCode = context.switchToHttp().getResponse().statusCode;

    const messageFromMsgMetadata = this.reflector.get<string>(
      'response-message',
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => ({
        message: messageFromMsgMetadata || data.message,
        statusCode: currentStatusCode,
        data: data.data || data,
      })),
    );
  }
}
