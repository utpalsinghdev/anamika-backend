import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'

import { SwaggerModule } from '@nestjs/swagger/dist'
import { ValidationPipe } from '@nestjs/common/pipes'
import * as morgan from 'morgan'
import * as express from 'express'
import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path'; // Import the 'path' module
async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'warn'],
  // })
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })) //TODO: Fixing Pipe Issue

  app.use(morgan('dev'))
  cloudinary.config({
    cloud_name: "dedbpyhmr",
    api_key: "735616525684875",
    api_secret: "fu26Y1WSxB20E3V4-c2Z3KNqZrk",
  });

  app.use('/uploads/protected', express.static(path.join(__dirname, '..', 'uploads', 'protected')));


  await app.listen(7009)
}
bootstrap()
