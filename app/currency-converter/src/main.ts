import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ms-currenvy-converter')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'ms-currenvy-converter',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document, customOptions);
  
  await app.listen(3000);
}
bootstrap();
