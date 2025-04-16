export type UpdateModerationStatusDto = {
  status: "Approved" | "Rejected";
  comment?: string;
};
