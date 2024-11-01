import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: '24h',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  database: {
    url: process.env.DATABASE_URL
  },
  email: {
    from: process.env.EMAIL_FROM || 'noreply@inqut.com',
    apiKey: process.env.EMAIL_API_KEY
  }
} as const;