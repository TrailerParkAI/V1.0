import { z } from 'zod';

// Base schema for common fields
export const baseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// User schema
export const userSchema = baseEntitySchema.extend({
  name: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
  role: z.enum(['client', 'artist', 'studio'])
});

// Client schema
export const clientSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  tattooPreferences: z.object({
    styles: z.array(z.string()),
    colors: z.array(z.string()),
    themes: z.array(z.string())
  }),
  galleryIds: z.array(z.string().uuid()),
  favoriteArtists: z.array(z.string().uuid()),
  bookingHistory: z.array(z.string().uuid()),
  notificationPreferences: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean()
  })
});

// Artist schema
export const artistSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  portfolio: z.object({
    images: z.array(z.string().url()),
    description: z.string(),
    styles: z.array(z.string())
  }),
  studioId: z.string().uuid().optional(),
  rating: z.number().min(0).max(5),
  socialMediaLinks: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional()
  })
});

// Studio schema
export const studioSchema = baseEntitySchema.extend({
  name: z.string(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number()
    })
  }),
  artistIds: z.array(z.string().uuid()),
  contactInfo: z.object({
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url().optional()
  })
});

// Booking schema
export const bookingSchema = baseEntitySchema.extend({
  clientId: z.string().uuid(),
  artistId: z.string().uuid(),
  studioId: z.string().uuid().optional(),
  appointmentDate: z.date(),
  status: z.enum(['pending', 'confirmed', 'completed', 'canceled']),
  depositAmount: z.number().min(0),
  cancellationReason: z.string().optional()
});

// Export types based on schemas
export type User = z.infer<typeof userSchema>;
export type Client = z.infer<typeof clientSchema>;
export type Artist = z.infer<typeof artistSchema>;
export type Studio = z.infer<typeof studioSchema>;
export type Booking = z.infer<typeof bookingSchema>;