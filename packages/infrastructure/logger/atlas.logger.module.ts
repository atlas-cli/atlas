
import { Module } from '@nestjs/common';
import { AtlasLogger } from './atlas.logger';

@Module({
  providers: [AtlasLogger],
  exports: [AtlasLogger],
})
export class AtlasLoggerModule {}
