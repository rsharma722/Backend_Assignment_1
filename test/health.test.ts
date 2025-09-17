import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  it("health should return a valid health check response", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("version", "1.0.0");
  });

  it("should return uptime as a number", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(typeof response.body.uptime).toBe("number");
    expect(response.body.uptime).toBeGreaterThan(0);
  });

  it("should return timestamp in ISO format", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(() => new Date(response.body.timestamp)).not.toThrow();
  });
});