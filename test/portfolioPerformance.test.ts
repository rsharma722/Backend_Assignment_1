import { 
    computePortfolioPerformance,
    findLargestHolding, 
    Asset,
    calculateAssetAllocation,
} from '../src/portfolio/portfolioPerformance';

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

describe('findLargestHolding', () => {
  const sampleAssets: Asset[] = [
    { name: 'Tesla Stock', value: 20000, category: 'stock' },
    { name: 'Amazon Stock', value: 35000, category: 'stock' },
    { name: 'Beach House', value: 450000, category: 'real estate' },
    { name: 'Corporate Bonds', value: 25000, category: 'bond' },
  ];

  it('should return the asset with the highest value', () => {
    const largest = findLargestHolding(sampleAssets);

    expect(largest).toBeDefined();
    expect(largest!.name).toBe('Beach House');
    expect(largest!.value).toBe(450000);
  });

  it('should return null for empty assets array', () => {
    const result = findLargestHolding([]);

    expect(result).toBeNull();
  });

  it('should handle tied values by returning the first largest', () => {
    const tiedAssets: Asset[] = [
      { name: 'Asset X', value: 20000, category: 'stock' },
      { name: 'Asset Y', value: 20000, category: 'bond' },
      { name: 'Asset Z', value: 15000, category: 'real estate' },
    ];

    const largest = findLargestHolding(tiedAssets);

    expect(largest).toBeDefined();
    expect(largest!.value).toBe(20000);
    expect(largest!.name).toBe('Asset X');
  });
});


describe('calculateAssetAllocation', () => {
  const demoAssets: Asset[] = [
    { name: 'Tesla Stock', value: 40000, category: 'stock' },
    { name: 'Amazon Stock', value: 40000, category: 'stock' },
    { name: 'US Treasury Bonds', value: 20000, category: 'bond' }
  ];

  it('should calculate correct percentages for mixed distribution', () => {
    const allocation = calculateAssetAllocation(demoAssets);

    expect(allocation.stock).toBe(80); 
    expect(allocation.bond).toBe(20); 
  });

  it('should handle another uneven distribution', () => {
    const unevenAssets: Asset[] = [
      { name: 'Real Estate Fund', value: 60000, category: 'real estate' },
      { name: 'Corporate Bonds', value: 40000, category: 'bond' }
    ];

    const allocation = calculateAssetAllocation(unevenAssets);

    expect(allocation['real estate']).toBe(60); 
    expect(allocation.bond).toBe(40);          
  });

  it('should return an empty object for no assets', () => {
    const allocation = calculateAssetAllocation([]);

    expect(allocation).toEqual({});
  });
});
