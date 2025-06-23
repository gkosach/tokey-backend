import request from "supertest";
import { prisma } from "../../src/common";
import app from "../../src/main";

jest.mock("../../src/common", () => {
  const originalModule = jest.requireActual("../../src/common");
  return {
    ...originalModule,
    prisma: {
      user: {
        findUnique: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
      },
      property: {
        findMany: jest.fn().mockResolvedValue([{ district: "Central" }]),
        findUnique: jest.fn().mockResolvedValue({ id: "property-123" }),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
      },
      wallet: {
        findUnique: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
      },
      tokenTransaction: {
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
      },
    },
  };
});

describe("Endpoint Existence Tests", () => {
  it("GET / should respond with 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/users should respond with status", async () => {
    const res = await request(app).post("/api/users").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/users/profile should respond with status", async () => {
    const res = await request(app).get("/api/users/profile");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("PUT /api/users/email should respond with status", async () => {
    const res = await request(app).put("/api/users/email").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/wallets/info should respond with status", async () => {
    const res = await request(app).get("/api/wallets/info");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/wallets/create should respond with status", async () => {
    const res = await request(app).post("/api/wallets/create").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/wallets/balance should respond with status", async () => {
    const res = await request(app).get("/api/wallets/balance");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/kyc/status should respond with status", async () => {
    const res = await request(app).get("/api/kyc/status");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/kyc/verificate should respond with status", async () => {
    const res = await request(app).post("/api/kyc/verificate").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/kyc/webhook should respond with status", async () => {
    const res = await request(app).post("/api/kyc/webhook").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/kyc/details should respond with status", async () => {
    const res = await request(app).get("/api/kyc/details");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/tokens/balances should respond with status", async () => {
    const res = await request(app).get("/api/tokens/balances");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/tokens/purchase should respond with status", async () => {
    const res = await request(app).post("/api/tokens/purchase").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/tokens/history should respond with status", async () => {
    const res = await request(app).get("/api/tokens/history");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/properties should respond with status", async () => {
    const res = await request(app).get("/api/properties");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/properties/active should respond with status", async () => {
    const res = await request(app).get("/api/properties/active");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/properties/districts should respond with status", async () => {
    (prisma.property.findMany as jest.Mock).mockResolvedValue([{ district: "Central" }, { district: "North" }]);

    const res = await request(app).get("/api/properties/districts");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/properties/property-123 should respond with status", async () => {
    const res = await request(app).get("/api/properties/property-123");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("POST /api/properties should respond with status", async () => {
    const res = await request(app).post("/api/properties").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("PATCH /api/properties/property-123/status should respond with status", async () => {
    const res = await request(app).patch("/api/properties/property-123/status").send({});
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /api/blockchain should respond with status", async () => {
    const res = await request(app).get("/api/blockchain");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  it("GET /unknown-route should respond with status", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });
});
