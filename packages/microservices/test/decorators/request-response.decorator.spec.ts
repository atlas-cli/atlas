import {
    PATTERN_METADATA,
    TRANSPORT_METADATA,
  } from '@nestjs/microservices/constants';
  import { TRANSPORT_METADATA_REQUEST_RESPONSE } from './../../contants';
  import { RequestResponsePattern } from './../../decorators/request-response.decorator';
  
  describe('@RequestResponsePattern', () => {
    const pattern = 'pattern';
    class TestComponent {
      @RequestResponsePattern(pattern)
      public static test(): void {}
    }
    it(`should enhance method with ${PATTERN_METADATA} metadata`, () => {
      const metadata = Reflect.getMetadata(PATTERN_METADATA, TestComponent.test);
      expect(metadata).toBe(pattern);
    });
    it(`should enhance method with ${TRANSPORT_METADATA} metadata`, () => {
      const metadata = Reflect.getMetadata(TRANSPORT_METADATA, TestComponent.test);
      expect(metadata).toBe(TRANSPORT_METADATA_REQUEST_RESPONSE);
    });
  });