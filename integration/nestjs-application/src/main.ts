import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtlasLogger } from '@atlas/infrastructure/logger/atlas.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AtlasLogger('NestJSTest'),
    bufferLogs: true,
  });
  await app.listen(3000);
}
bootstrap();
