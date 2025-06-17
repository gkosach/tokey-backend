import crypto from "crypto";
import { RequestHandler } from "express";

export const personaWebhookMiddleware: RequestHandler = (req: any, res, next) => {
  // Проверяем наличие секрета
  const webhookSecret = process.env.PERSONA_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("PERSONA_WEBHOOK_SECRET environment variable is not set");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  // Получаем заголовок подписи (проверяем в разных регистрах)
  const header = req.headers["persona-signature"] || req.headers["Persona-Signature"];
  if (!header || typeof header !== "string") {
    console.warn(
      "Missing or invalid Persona-Signature header:",
      req.headers["persona-signature"] || req.headers["Persona-Signature"],
    );
    return res.status(400).json({ error: "Missing Persona-Signature header" });
  }

  // Парсим подпись согласно документации Persona
  const signatureParts = header.split(" ");
  let timestamp: string | undefined;
  const signatures: string[] = [];

  for (const part of signatureParts) {
    const keyValuePairs = part.split(",");
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split("=");
      if (key === "t") {
        timestamp = value;
      } else if (key === "v1") {
        signatures.push(value);
      }
    }
  }

  if (!timestamp || signatures.length === 0) {
    console.warn("Invalid signature format - missing timestamp or signatures");
    return res.status(400).json({ error: "Invalid signature format" });
  }

  // Проверяем временную метку (5 минут = 300 секунд)
  const timestampNum = parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (isNaN(timestampNum) || Math.abs(now - timestampNum) > 300) {
    console.warn("Signature timestamp out-of-window:", { timestampNum, now, diff: Math.abs(now - timestampNum) });
    return res.status(403).json({ error: "Signature timestamp out-of-window" });
  }

  // Получаем сырое тело запроса (уже сохранено в main.ts)
  const rawBody = req.rawBody;

  if (!rawBody || typeof rawBody !== "string") {
    console.error("Raw body unavailable - express.json may not be configured correctly");
    console.error("Available body properties:", Object.keys(req.body || {}));
    return res.status(400).json({ error: "Raw body unavailable" });
  }

  // Вычисляем ожидаемую подпись согласно документации Persona
  const payload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");

  // Проверяем, совпадает ли хотя бы одна из подписей
  const verified = signatures.some((signature) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));
    } catch (error) {
      console.warn("Error comparing signatures:", error);
      return false;
    }
  });

  if (!verified) {
    console.warn("Persona webhook signature verification failed");
    console.warn("Expected signature:", expectedSignature);
    console.warn("Received signatures:", signatures);
    return res.status(403).json({ error: "Invalid signature" });
  }

  console.log("Persona webhook signature verified successfully");
  // Подпись валидна, продолжаем обработку
  next();
};
