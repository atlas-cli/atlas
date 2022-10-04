import { Atlas, AtlasConfig } from '@atlas/infrastructure';
import { HelloWorldStack } from './hello-world/infrastructure';

const config = new AtlasConfig();
config.name = 'integration';
config.http = {
    before: (app) => {
        new HelloWorldStack(app, 'HelloWorldStack');
        return app;
    }
};

const atlas = new Atlas(config);
atlas.bootstrap();