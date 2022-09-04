import {
  PATTERN_METADATA,
  TRANSPORT_METADATA,
} from '@nestjs/microservices/constants';
import { TRANSPORT_METADATA_EVENT_DRIVEN } from './../../contants';
import { EventDrivenPattern } from '../../decorators/event-driven.decorator';

describe('@EventDrivenPattern', () => {
  const pattern = 'pattern';
  class TestComponent {
    @EventDrivenPattern(pattern)
    public static test(): void {}
  }
  it(`should enhance method with ${PATTERN_METADATA} metadata`, () => {
    const metadata = Reflect.getMetadata(PATTERN_METADATA, TestComponent.test);
    expect(metadata).toBe(pattern);
  });
  it(`should enhance method with ${TRANSPORT_METADATA} metadata`, () => {
    const metadata = Reflect.getMetadata(TRANSPORT_METADATA, TestComponent.test);
    expect(metadata).toBe(TRANSPORT_METADATA_EVENT_DRIVEN);
  });
});