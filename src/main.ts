import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionFilter } from 'src/common/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';
import { QueueNames } from 'src/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const rabbitMQUrl = configService.get<string>('RABBITMQ_URL');

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQUrl],
        queue: QueueNames.ORDER_QUEUE,
        queueOptions: {
          durable: true,
        },
        noAck: false,
        prefetchCount: 2, // 🚀 Controls how many orders are processed at a time
      },
    });

  microservice.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  microservice.useGlobalFilters(new AllExceptionFilter(configService));

  await microservice.listen();
}

bootstrap();
