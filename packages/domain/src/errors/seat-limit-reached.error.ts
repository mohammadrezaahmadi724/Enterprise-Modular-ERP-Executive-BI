export class SeatLimitReachedError extends Error {
  readonly code = 'SEAT_LIMIT_REACHED';
  constructor(maxSeats: number) {
    super(`Subscription seat limit reached (max ${maxSeats})`);
    this.name = 'SeatLimitReachedError';
  }
}
