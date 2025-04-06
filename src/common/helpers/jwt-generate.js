require("dotenv").config();
const jwt = require("jsonwebtoken");
const path = require("path");

// Указываем правильный путь к .env файлу
const envPath = path.resolve(__dirname, "../../../env/.development.env");

// Загружаем переменные из указанного .env файла
require("dotenv").config({ path: envPath });

const payload = {
  sub: "64187488-1031-702a-6548-1f285780f4e7",
  "custom:role": "manager",
  exp: Math.floor(Date.now() / 1000) + 3600,
};

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  console.error("JWT_SECRET is not defined in .env file");
  process.exit(1);
}

const token = jwt.sign(payload, secretKey);
console.log("Generated Token:", token);
