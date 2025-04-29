import { StakingRecord } from "@prisma/client";

export class StakingService {
  private mockStakes: StakingRecord[] = [
    {
      id: "stake1",
      amount: "500",
      userId: "user1",
      propertyId: "prop1",
      lastClaim: new Date(),
    },
  ];

  async getStakes(_userId: string): Promise<StakingRecord[]> {
    return this.mockStakes;
  }
}
