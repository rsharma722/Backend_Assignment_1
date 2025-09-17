import { computePortfolioPerformance } from '../src/portfolio/portfolioPerformance';

describe('computePortfolioPerformance', () => {

  it('should calculate profit correctly', () => {
    const result = computePortfolioPerformance(10000, 12000); 
    expect(result.netChange).toBe(2000);                    
    expect(result.changePercentage).toBe(20);              
    expect(result.summary).toContain('gained');             
  });

  it('should calculate loss correctly', () => {
    const result = computePortfolioPerformance(15000, 12000);
    expect(result.netChange).toBe(-3000);
    expect(result.changePercentage).toBeCloseTo(-20);
    expect(result.summary).toContain('lost');
  });

  it('should handle no change correctly', () => {
    const result = computePortfolioPerformance(10000, 10000); 
    expect(result.netChange).toBe(0);
    expect(result.changePercentage).toBe(0);
    expect(result.summary).toContain('remains unchanged');
  });

  it('should calculate significant gain correctly', () => {
    const result = computePortfolioPerformance(5000, 7000);
    expect(result.netChange).toBe(2000);
    expect(result.changePercentage).toBe(40);
    expect(result.summary).toContain('gained significantly');
  });

});
