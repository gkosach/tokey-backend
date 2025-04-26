import { ModerationStatus } from "../../../../prisma/types/prismaTypes";

export type UpdateModerationStatusDto = {
  status: ModerationStatus;
  comment?: string;
};
