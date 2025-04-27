import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

// 1. Middleware для вебхуков (persona-webhook.middleware.ts)
export const personaWebhookMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const signature = req.header("Persona-Signature");
    const rawBody = (req as any).rawBody;

    // Проверка конфигурации сервера
    if (!process.env.NEXT_PERSONA_SHA) {
      res.status(500).json({ error: "Server misconfiguration" });
      return;
    }

    // Валидация обязательных параметров
    if (!signature) {
      res.status(401).json({ error: "Missing signature header" });
      return;
    }

    // Генерация ожидаемой подписи
    const hmac = crypto.createHmac("sha256", process.env.NEXT_PERSONA_SHA);
    const digest = hmac.update(rawBody).digest("hex");
    const expectedSignature = `sha256=${digest}`;

    // Сравнение подписей
    if (expectedSignature !== signature) {
      res.status(401).json({ error: "Invalid signature" });
      return;
    }

    // Парсинг тела после проверки
    req.body = JSON.parse(rawBody.toString());
    next();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
