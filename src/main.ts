import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import fmp from 'fastify-multipart';
import fastifyHelmet from 'fastify-helmet';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import config from '@config';
import Logger from '@modules/common/logger/logger.service';

async function bootstrap() {
  process.addListener('SIGINT', () => {
    console.log(
      `------------------------------------------------------------------------------------------------------------------------------\n`,
      `-------------------------------------------------- PROCESS KILLED BY SIGINT -------------------------------------------------- \n`,
      `------------------------------------------------------------------------------------------------------------------------------`,
    );
    process.kill(process.pid);
  });

  // 앱 인스턴스 생성
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // multi-part 설정
  await app.register(fmp);

  // Prefix Url 설정
  app.setGlobalPrefix(config.prefixPath.api);

  // Logger 설정
  app.useLogger(new Logger());

  // PipeLine 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: !config.DEBUG,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.register(fastifyHelmet);

  await app.listen(config.PORT, '0.0.0.0');
}

bootstrap();
