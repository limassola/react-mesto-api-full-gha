class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'Недостаточно прав для удаления карточки';
  }
}
module.exports = ForbiddenError;
