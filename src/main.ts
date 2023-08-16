import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { ValidationPipe } from '@nestjs/common/pipes'
import * as morgan from 'morgan'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  app.enableCors()
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })) //TODO: Fixing Pipe Issue
  const config = new DocumentBuilder()
    .setTitle('Green Apple APIs')
    .setDescription('All Apis for Green Apple Pvt. Ltd.')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  app.use(morgan('dev'))

  SwaggerModule.setup('/api-docs', app, document)
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  await app.listen(8084)
}
bootstrap()
