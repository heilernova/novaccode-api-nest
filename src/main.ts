import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { IConfig, getConfig } from './core/config';
import { AllExceptionsFilter } from './http';


async function bootstrap() {
  const config: IConfig = getConfig();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(config.http.port);
}
bootstrap();
