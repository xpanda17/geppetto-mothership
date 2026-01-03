export class ForbiddenError extends Error {
  constructor(message = 'Access Denied: You do not have the required permissions.') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}
