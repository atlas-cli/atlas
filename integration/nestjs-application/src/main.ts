import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtlasNestLogger } from '@atlas/common/logger/frameworks/logger.nestjs';

async function bootstrap() {
  const atlasLogger: AtlasNestLogger = new AtlasNestLogger();

  const app = await NestFactory.create(AppModule, {
    logger: atlasLogger,
  });

  atlasLogger.setLambdaMode(true);
  atlasLogger.setLambdaContext('LAMBDA_CONTEXT_111');
  await app.listen(3000);
}
bootstrap();
