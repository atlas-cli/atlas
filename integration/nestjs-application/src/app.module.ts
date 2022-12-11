import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AtlasLoggerModule } from '@atlas/infrastructure/logger/atlas.logger.module';
import { AppService } from './app.service';

@Module({
  imports: [AtlasLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
