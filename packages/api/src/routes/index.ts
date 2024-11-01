import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import artistRoutes from './artist.routes';
import studioRoutes from './studio.routes';
import bookingRoutes from './booking.routes';
import paymentRoutes from './payment.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/artists', artistRoutes);
router.use('/studios', studioRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);

export const routes = router;