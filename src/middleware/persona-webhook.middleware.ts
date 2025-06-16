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
  const signatureHeader = req.headers["persona-signature"] as string;
  const t = signatureHeader.split(",")[0].split("=")[1];
  const signatures = signatureHeader.split(" ").map((pair) => pair.split("v1=")[1]);

  const hmac = crypto
    .createHmac("sha256", process.env.PERSONA_WEBHOOK_SECRET!)
    .update(`${t}.${JSON.stringify(req.body)}`)
    .digest("hex");

  // See if any of the signatures are valid
  const isVerified = signatures.some((signature) => {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  });

  if (!isVerified) {
    console.log("Failed passing personaWebhookMiddleware");
    res.status(403).json({ error: "Invalid signature" });
    return;
  }

  console.log("Passed personaWebhookMiddleware");

  next();
};
