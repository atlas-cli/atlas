import { PatternMetadata } from "@nestjs/microservices";
import { PATTERN_HANDLER_METADATA, PATTERN_METADATA, TRANSPORT_METADATA } from "@nestjs/microservices/constants";
import { PatternHandler } from '@nestjs/microservices/enums/pattern-handler.enum';
import { TRANSPORT_METADATA_REQUEST_RESPONSE } from "./../contants";
import 'reflect-metadata';

export const RequestResponsePattern = <T = PatternMetadata | string>(
    metadata?: T,
  ): MethodDecorator => {
    return (
      _: object,
      __: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      Reflect.defineMetadata(PATTERN_METADATA, metadata, descriptor.value);
      Reflect.defineMetadata(
        PATTERN_HANDLER_METADATA,
        PatternHandler.MESSAGE,
        descriptor.value,
      );
      Reflect.defineMetadata(TRANSPORT_METADATA, TRANSPORT_METADATA_REQUEST_RESPONSE, descriptor.value);
      return descriptor;
    };
  };