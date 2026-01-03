export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized: Invalid or missing token.') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
