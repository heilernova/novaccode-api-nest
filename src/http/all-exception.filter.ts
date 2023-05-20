import { Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { DatabaseError } from 'pg';
import { getConfig } from 'src/core/config';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {

    const config = getConfig();

    if (exception instanceof HttpException){

      exception = new HttpException({
        version: '1.0.0.beta',
        status: exception.getStatus(),
        message: exception.message
      }, exception.getStatus());

    } else {
      if (exception instanceof DatabaseError){
        exception = new HttpException({
          version: '1.0.0.beta',
          status: 500,
          message: config.debug ? `Error con las consulta SQL: ${exception.message}` : 'Error interno del servidor'
        }, 500);
      }
    }

    super.catch(exception, host);
  }
}