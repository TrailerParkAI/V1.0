import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { createBookingSchema, updateBookingStatusSchema } from '../schemas/booking.schema';

const router = Router();
const controller = new BookingController();

router.use(authenticate);

router.post('/', validateRequest(createBookingSchema), controller.createBooking);
router.get('/', controller.getBookings);
router.get('/:id', controller.getBookingById);
router.put('/:id/status', validateRequest(updateBookingStatusSchema), controller.updateBookingStatus);
router.post('/:id/cancel', controller.cancelBooking);

export default router;