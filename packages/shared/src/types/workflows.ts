// Booking workflow states and transitions
export type BookingWorkflowState =
  | 'inquiry'
  | 'consultation'
  | 'deposit_pending'
  | 'deposit_paid'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'canceled';

export interface BookingWorkflow {
  id: string;
  bookingId: string;
  currentState: BookingWorkflowState;
  history: BookingWorkflowEvent[];
}

export interface BookingWorkflowEvent {
  id: string;
  workflowId: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
}

// Notification workflow
export interface NotificationWorkflow {
  id: string;
  userId: string;
  type: 'email' | 'sms' | 'push';
  status: 'pending' | 'sent' | 'failed';
  data: Record<string, any>;
  attempts: number;
  lastAttempt?: Date;
}

// Payment workflow
export interface PaymentWorkflow {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId?: string;
}