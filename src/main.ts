import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './_utils/filters/global-exception.filter';
import validationPipeOptions from './_utils/configs/validation-pipe-options.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  const config = new DocumentBuilder()
    .setTitle('Olfactorio API')
    .setDescription('Route description of Olfactorio API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(port);
}
bootstrap();
