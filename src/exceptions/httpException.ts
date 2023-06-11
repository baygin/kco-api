export class HttpException extends Error {
  public status: Number;
  public message: string;

  constructor(status: Number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
