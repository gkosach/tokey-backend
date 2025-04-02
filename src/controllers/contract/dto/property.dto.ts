import { Property } from "@/src/db/entities";

export class PropertyDTO {
  id: string;
  latitude: number;
  longitude: number;
  manager?: {
    id: string;
    name: string;
    email: string;
  };

  static fromEntity(property: Property): PropertyDTO {
    const dto = new PropertyDTO();
    if (property.manager) {
      dto.manager = {
        id: property.manager.cognitoId, // cognitoId - UUID (string)
        name: property.manager.name,
        email: property.manager.email,
      };
    }

    return dto;
  }
}
