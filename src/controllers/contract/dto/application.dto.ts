import { PropertyDTO } from "@/src/controllers";
import { UserDTO } from "@/src/controllers/contract/dto/user.dto";
import { Application } from "@/src/db/entities";
export class ApplicationDTO {
  id: string;
  status: string;
  message: string;
  property: PropertyDTO;
  applicant: UserDTO;

  static fromEntity(application: Application): ApplicationDTO {
    return {
      id: application.id,
      status: application.status,
      message: application.message,
      property: PropertyDTO.fromEntity(application.property),
      applicant: UserDTO.fromEntity(application.applicant),
    };
  }
}
