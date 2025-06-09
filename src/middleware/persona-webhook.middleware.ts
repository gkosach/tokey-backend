import crypto from "crypto";
import { RequestHandler } from "express";

/**
 * Middleware для проверки подписи webhook'а от Persona
 * Проверяет, что запрос действительно пришел от Persona API
 * используя HMAC-SHA256 подпись
 *
 * @returns Express middleware функция
 * @throws 403 - Если подпись не совпадает
 */
export const personaWebhookMiddleware: RequestHandler = (req, res, next) => {
  const signature = req.headers["persona-signature"] as string;
  const rawBody = (req as any).rawBody || "";
  const expectedSignature = crypto.createHmac("sha256", process.env.PERSONA_API_KEY!).update(rawBody).digest("hex");
  if (signature !== `sha256=${expectedSignature}`) {
    res.status(403).json({ error: "Invalid signature" });
    return;
  }

  next();
};
