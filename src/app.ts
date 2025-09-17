import express, { Request, Response } from "express";
import {
  computePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset,
} from "./portfolio/portfolioPerformance";

const app = express();

// Health check endpoint
app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Portfolio Performance Endpoint
app.get("/api/v1/portfolio/performance", (req: Request, res: Response) => {
  const initialAmount = Number(req.query.initialInvestment) || 10000;
  const currentAmount = Number(req.query.currentValue) || 12000;

  const performance = computePortfolioPerformance(initialAmount, currentAmount);
  res.json({ performance });
});

// Largest Holding Endpoint
app.get("/api/v1/portfolio/largest-holding", (_req: Request, res: Response) => {
  const portfolioAssets: Asset[] = [
    { name: "Tesla Stock", value: 20000, category: "stock" },
    { name: "Amazon Stock", value: 35000, category: "stock" },
    { name: "Beach House", value: 450000, category: "real estate" },
    { name: "Corporate Bonds", value: 25000, category: "bond" },
  ];

  const largestAsset = findLargestHolding(portfolioAssets);
  res.json({ topAsset: largestAsset ?? "No assets found" }); 
});

// Asset Allocation Endpoint
app.get("/api/v1/portfolio/allocation", (_req: Request, res: Response) => {
  const allocationAssets: Asset[] = [
    { name: "Tesla Stock", value: 40000, category: "stock" },
    { name: "Amazon Stock", value: 40000, category: "stock" },
    { name: "US Treasury Bonds", value: 20000, category: "bond" },
  ];

  const allocation = calculateAssetAllocation(allocationAssets);
  res.json({ allocation }); 
});

export default app;
