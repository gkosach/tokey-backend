import crypto from "crypto";
import { RequestHandler } from "express";

export const personaWebhookMiddleware: RequestHandler = (req, res, next) => {
  const signature = req.headers["persona-signature"] as string;
  const rawBody = JSON.stringify(req.body);

  const hmac = crypto.createHmac("sha256", process.env.PERSONA_WEBHOOK_SECRET!);
  const digest = hmac.update(rawBody).digest("hex");

  if (signature !== digest) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  next();
};
