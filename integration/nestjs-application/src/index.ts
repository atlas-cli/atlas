import { AtlasFactory, } from '@atlas/microservices';
import { AppModule } from './app.module';

export const handler = AtlasFactory.create(AppModule);