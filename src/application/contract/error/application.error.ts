import { BaseError } from "../../../common/utils/base-error";
import { ErrorStatus } from "../../../common/enum/error/error-status.enum";
import { ApplicationErrorMessages } from "../../../common/enum/error/apllication-error.enum";

export class ApplicationError extends BaseError {
  constructor(code: ErrorStatus, message: ApplicationErrorMessages) {
    super(code, message);
  }
}
