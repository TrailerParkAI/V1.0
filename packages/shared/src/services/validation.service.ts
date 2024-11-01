import { z } from 'zod';
import {
  userSchema,
  clientSchema,
  artistSchema,
  studioSchema,
  bookingSchema
} from '../types/models';

export class ValidationService {
  static validateUser(data: unknown) {
    return userSchema.parse(data);
  }

  static validateClient(data: unknown) {
    return clientSchema.parse(data);
  }

  static validateArtist(data: unknown) {
    return artistSchema.parse(data);
  }

  static validateStudio(data: unknown) {
    return studioSchema.parse(data);
  }

  static validateBooking(data: unknown) {
    return bookingSchema.parse(data);
  }

  static validatePartial<T extends z.ZodType>(schema: T, data: unknown) {
    return schema.partial().parse(data);
  }
}