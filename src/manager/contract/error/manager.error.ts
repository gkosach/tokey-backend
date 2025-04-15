import { BaseError } from "../../../common/utils/base-error";
import { ErrorStatus } from "../../../common/enum/error/error-status.enum";
import { ManagerErrorMessages } from "../../../common/enum/error/manager-error.enum";

export class ManagerError extends BaseError {
  constructor(code: ErrorStatus, message: ManagerErrorMessages) {
    super(code, message);
  }
}
