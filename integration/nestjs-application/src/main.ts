import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtlasLogger } from '@atlas/infrastructure/logger/atlas.logger';
import { AtlasProtoLogger as AtlasLoggerTest } from '@atlas/common/logger/logger';
import { AtlasNestLogger } from '@atlas/common/logger/frameworks/logger.nestjs';
import { LoggerService } from '@nestjs/common';

async function bootstrap() {
  // const testLogger: LoggerService = new AtlasLoggerTest();
  // testLogger.log('Log Imbecil');

  const app = await NestFactory.create(AppModule, {
    logger: new AtlasNestLogger(),
    // bufferLogs: true,
  });
  await app.listen(3000);
}
bootstrap();
