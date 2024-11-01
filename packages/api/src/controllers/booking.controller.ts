import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class BookingController {
  private bookingService = new BookingService();

  createBooking = async (req: AuthRequest, res: Response) => {
    const clientId = req.user.id;
    const bookingData = req.body;
    const booking = await this.bookingService.createBooking(clientId, bookingData);
    res.status(201).json(booking);
  };

  getBookings = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;
    const filters = req.query;
    const bookings = await this.bookingService.getBookings(userId, role, filters);
    res.json(bookings);
  };

  getBookingById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const booking = await this.bookingService.getBookingById(id);
    res.json(booking);
  };

  updateBookingStatus = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await this.bookingService.updateBookingStatus(id, status);
    res.json(booking);
  };

  cancelBooking = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { reason } = req.body;
    const result = await this.bookingService.cancelBooking(id, reason);
    res.json(result);
  };
}