import { ErrorStatus } from "../../../common/enum/error/error-status.enum";
import { BaseError } from "../../../common/utils/base-error";
import { CommonErrorMessages } from "../../../common";

export class DatabaseError extends BaseError {
  constructor(code: ErrorStatus, message: CommonErrorMessages) {
    super(code, message);
  }
}
