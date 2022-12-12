import { AtlasFactory, } from '@atlas-org/microservices';
import { AppModule } from './app.module';

export const handler = AtlasFactory.create(AppModule);