import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { IResponseBase } from './http-reponse';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {



        return {
          version: '1.0.0.beta',
          status: undefined,
          response: value
        };
      }),
      catchError(err => {

        // if (err instanceof HttpException){
        //   let body = {
        //     version: '1.0.0.beta',
        //     status: err.getResponse(),
        //     response: err.getStatus
        //   }
        //   console.log(body);
        // }
        
        return throwError(() => err);
      })
    );
  }
}
