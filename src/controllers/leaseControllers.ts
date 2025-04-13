import { Request, Response } from "express";

import { prisma } from "../database/prisma-client";

/**
 * Получает список всех арендных договоров.
 * @param req - HTTP-запрос.
 * @param res - HTTP-ответ с данными договоров.
 * @returns void
 */
export const getLeases = async (req: Request, res: Response): Promise<void> => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        investor: true,
        property: true,
      },
    });
    res.json(leases);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving leases: ${error.message}` });
  }
};

/**
 * Получает список платежей по конкретному арендному договору.
 * @param req - HTTP-запрос с параметром ID договора.
 * @param res - HTTP-ответ с данными платежей.
 * @returns void
 */
export const getLeasePayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payments = await prisma.payment.findMany({
      where: { leaseId: Number(id) },
    });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving lease payments: ${error.message}` });
  }
};
