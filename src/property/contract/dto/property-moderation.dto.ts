import { ModerationStatus } from "@prisma/client";

export type UpdateModerationStatusDto = {
  status: ModerationStatus;
  comment?: string;
};
