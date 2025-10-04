import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        const result = errors.map((err) => ({
          field: err.property,
          messages: Object.values(err.constraints ?? {})
        }));
        throw new BadRequestException(result);
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
