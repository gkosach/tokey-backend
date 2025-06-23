import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

interface WebhookRequest extends Request {
  rawBody?: string;
}

export const personaWebhookMiddleware = (req: WebhookRequest, res: Response, next: NextFunction) => {
  const webhookSecret = process.env.PERSONA_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("PERSONA_WEBHOOK_SECRET environment variable is not set");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  const header = req.headers["persona-signature"] || req.headers["Persona-Signature"];
  if (!header || typeof header !== "string") {
    console.warn("Missing or invalid Persona-Signature header");
    return res.status(400).json({ error: "Missing Persona-Signature header" });
  }

  const { timestamp, signatures } = parseSignatureHeader(header);
  if (!timestamp || signatures.length === 0) {
    console.warn("Invalid signature format - missing timestamp or signatures");
    return res.status(400).json({ error: "Invalid signature format" });
  }

  if (!isTimestampValid(timestamp)) {
    console.warn("Signature timestamp out-of-window");
    return res.status(403).json({ error: "Signature timestamp out-of-window" });
  }

  const rawBody = req.rawBody;
  if (!rawBody) {
    console.error("Raw body unavailable - express.json may not be configured correctly");
    return res.status(400).json({ error: "Raw body unavailable" });
  }

  if (!verifySignature(timestamp, rawBody, signatures, webhookSecret)) {
    console.warn("Persona webhook signature verification failed");
    return res.status(403).json({ error: "Invalid signature" });
  }

  console.log("Persona webhook signature verified successfully");
  next();
};

function parseSignatureHeader(header: string): { timestamp?: string; signatures: string[] } {
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

  return { timestamp, signatures };
}

function isTimestampValid(timestamp: string): boolean {
  const timestampNum = parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  return !isNaN(timestampNum) && Math.abs(now - timestampNum) <= 300;
}

function verifySignature(timestamp: string, rawBody: string, signatures: string[], webhookSecret: string): boolean {
  const payload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");

  return signatures.some((signature) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));
    } catch (error) {
      console.warn("Error comparing signatures:", error);
      return false;
    }
  });
}
