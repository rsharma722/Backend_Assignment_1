import request from "supertest";
import app from "../src/app";

describe("Portfolio API Integration", () => {
  describe("GET /api/v1/portfolio/performance", () => {
    it("returns performance with default values", async () => {
      const res = await request(app).get("/api/v1/portfolio/performance");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("performance");
      expect(res.body.performance).toHaveProperty("initialAmount");
      expect(res.body.performance).toHaveProperty("currentAmount");
      expect(res.body.performance).toHaveProperty("netChange");
      expect(res.body.performance).toHaveProperty("changePercentage");
      expect(res.body.performance).toHaveProperty("summary");
    });

    it("returns performance with custom query values", async () => {
      const res = await request(app).get(
        "/api/v1/portfolio/performance?initialInvestment=8000&currentValue=12000"
      );

      expect(res.status).toBe(200);
      expect(res.body.performance.initialAmount).toBe(8000);
      expect(res.body.performance.currentAmount).toBe(12000);
      expect(res.body.performance.netChange).toBe(4000);
    });
  });

  describe("GET /api/v1/portfolio/largest-holding", () => {
    it("retrieves the asset with the highest value", async () => {
      const res = await request(app).get("/api/v1/portfolio/largest-holding");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("topAsset");
      expect(res.body.topAsset).toHaveProperty("name");
      expect(res.body.topAsset).toHaveProperty("value");
      expect(res.body.topAsset).toHaveProperty("category");
    });
  });

  describe("GET /api/v1/portfolio/allocation", () => {
    it("returns allocation percentages for asset categories", async () => {
      const res = await request(app).get("/api/v1/portfolio/allocation");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("allocation");
      expect(res.body.allocation).toHaveProperty("stock");
      expect(res.body.allocation).toHaveProperty("bond");

      const percentages = Object.values(res.body.allocation) as number[];
      const totalPercentage = percentages.reduce((sum, val) => sum + val, 0);
      expect(totalPercentage).toBeCloseTo(100, 1);
    });
  });

  // This is Health Check
  describe("GET /api/v1/health", () => {
    it("returns status OK", async () => {
      const res = await request(app).get("/api/v1/health");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "OK");
      expect(res.body).toHaveProperty("uptime");
      expect(res.body).toHaveProperty("timestamp");
      expect(res.body).toHaveProperty("version");
    });
  });
});
