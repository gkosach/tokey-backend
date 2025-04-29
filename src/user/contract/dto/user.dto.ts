export interface CreateUserPayload {
  cognitoId: string;
  email: string;
  phoneNumber: string;
  name?: string;
}
