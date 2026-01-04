export class AccurateError extends Error {
  constructor(response) {
    const errorMessage = 'Accurate API Error';

    super(errorMessage);
    this.name = 'AccurateError';
    this.status = 500;
    this.response = {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    };
  }
}
