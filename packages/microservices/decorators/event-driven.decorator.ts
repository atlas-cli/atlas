import { PatternMetadata, Transport } from "@nestjs/microservices";
import { PATTERN_HANDLER_METADATA, PATTERN_METADATA, TRANSPORT_METADATA } from "@nestjs/microservices/constants";
import { PatternHandler } from '@nestjs/microservices/enums/pattern-handler.enum';

export const HandlerEventDriven = <T = PatternMetadata | string>(
    metadata?: T,
  ): MethodDecorator => {
    return (
      target: object,
      key: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      Reflect.defineMetadata(PATTERN_METADATA, metadata, descriptor.value);
      Reflect.defineMetadata(
        PATTERN_HANDLER_METADATA,
        PatternHandler.MESSAGE,
        descriptor.value,
      );
      Reflect.defineMetadata(TRANSPORT_METADATA, Transport.KAFKA, descriptor.value);
      return descriptor;
    };
  };