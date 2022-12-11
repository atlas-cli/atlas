import { AtlasFactory, } from '@atlas/microservices';
// import { AtlasLogger } from '@atlas/infrastructure/logger/atlas.logger';
import { AppModule } from './app.module';

export const handler = AtlasFactory.create(AppModule);