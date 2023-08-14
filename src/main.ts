import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common/pipes';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Green Apple APIs')
    .setDescription('All Apis for Green Apple Pvt. Ltd.')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(8084);
}
bootstrap();
