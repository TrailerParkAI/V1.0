// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  role: 'client' | 'artist' | 'studio';
}

export interface Client extends BaseEntity {
  userId: string;
  tattooPreferences: {
    styles: string[];
    colors: string[];
    themes: string[];
  };
  galleryIds: string[];
  favoriteArtists: string[];
  bookingHistory: string[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface Artist extends BaseEntity {
  userId: string;
  portfolio: {
    images: string[];
    description: string;
    styles: string[];
  };
  studioId?: string;
  rating: number;
  socialMediaLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Booking extends BaseEntity {
  clientId: string;
  artistId: string;
  studioId?: string;
  appointmentDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  depositAmount: number;
  cancellationReason?: string;
}