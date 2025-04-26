import { NextFunction, Request, Response } from "express";

// TODO:  добавитль Redis если нужно
const cache = new Map<string, { data: any; expires: number }>();

/**
 * Кэширует ответы на заданное время (в секундах)
 * @param ttl Время жизни кэша в секундах
 */
export function cacheMiddleware(ttl: number = 60) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.method !== "GET") return next();

    const key = req.originalUrl;
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && cached.expires > now) {
      res.json(cached.data); // Убрали return
      return;
    }

    const originalJson = res.json.bind(res);

    res.json = (body: any): Response => {
      cache.set(key, { data: body, expires: now + ttl * 1000 });
      return originalJson(body);
    };

    next();
  };
}
