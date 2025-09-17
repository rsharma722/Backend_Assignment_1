import express, { Request, Response } from "express";

const app = express();

interface HealthCheckResponse {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
}

// Health check endpoint
app.get("/api/v1/health", (req: Request, res: Response) => {
  const healthData: HealthCheckResponse = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  res.json(healthData);
});



export default app;
