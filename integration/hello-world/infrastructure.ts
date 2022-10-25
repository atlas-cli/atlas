import { Atlas, } from '@atlas/infrastructure';

const atlas = new Atlas({
    name: 'hello-world',
});
atlas.bootstrap();