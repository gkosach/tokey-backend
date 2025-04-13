import { ErrorStatus } from "../../../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../../../common/enum/error/property-error.enum";
import { BaseError } from "../../../common/utils/base-error";

export class PropertyError extends BaseError {
  constructor(code: ErrorStatus, message: PropertyErrorMessages) {
    super(code, message);
  }
}
