import { ErrorStatus } from "../enum";

export abstract class BaseError<TMessage extends string = string> extends Error {
  constructor(
    public readonly statusCode: ErrorStatus,
    public readonly message: TMessage,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static create<T extends BaseError<TMessage>, TMessage extends string>(
    this: new (code: ErrorStatus, message: TMessage) => T,
    code: ErrorStatus,
    message: TMessage,
  ): T {
    return new this(code, message);
  }
}
