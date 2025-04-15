import { InvestorErrorMessages } from "../../../common/enum/error/investor-error.enum";
import { BaseError } from "../../../common/utils/base-error";
import { ErrorStatus } from "../../../common/enum/error/error-status.enum";

export class InvestorError extends BaseError {
  constructor(code: ErrorStatus, message: InvestorErrorMessages) {
    super(code, message);
  }
}
