class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Email уже зарегистрирован';
  }
}
module.exports = DuplicateError;
