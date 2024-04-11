class MediaTypeError extends Error {
  statusCode = 400;
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export default MediaTypeError;
