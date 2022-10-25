import { Provider } from '@nestjs/common';
import { Length } from 'class-validator';

export class AtlasConfig {
    @Length(5, 55)
    name: string;
    infrastructures?: Provider<any>[];
    applications?: Provider<any>[];
}