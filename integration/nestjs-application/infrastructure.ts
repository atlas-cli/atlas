import { Atlas, } from '@atlas/infrastructure';

const atlas = new Atlas({
    name: 'nestjs-application',
});
atlas.bootstrap();