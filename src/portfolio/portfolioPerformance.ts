// This is Interface for portfolio performance output
export interface PortfolioResult {
  initialAmount: number;
  currentAmount: number;
  netChange: number;
  changePercentage: number;
  summary: string;
}

// This is Interface for largest holding
export interface Asset {
  name: string;
  value: number;
  category: string;
}

// This is Interface for asset allocation
export interface AssetAllocation {
 [assetType: string]: number;
}

// THe Function to calculate portfolio performance
export function computePortfolioPerformance(
  initialAmount = 10000,
  currentAmount = 15000
): PortfolioResult {
  const netChange = currentAmount - initialAmount;

  const changePercentage = initialAmount !== 0
    ? (netChange / initialAmount) * 100
    : 0;

  //It Determine performance summary without using if
  const significantGain = changePercentage > 20;
  const profit = netChange > 0;
  const loss = netChange < 0;
  const neutral = netChange === 0;

  const summary =
    significantGain ? `The portfolio has gained significantly with a profit of $${netChange.toFixed(2)}.` :
    profit ? `The portfolio has gained with a profit of $${netChange.toFixed(2)}.` :
    loss ? `The portfolio has lost $${Math.abs(netChange).toFixed(2)}.` :
    `The portfolio value remains unchanged.`;

  return {
    initialAmount,
    currentAmount,
    netChange,
    changePercentage,
    summary,
  };
}

// Function First :the Largest Holding
export function findLargestHolding(assets: Asset[]): Asset | null {
    return assets.length
        ? assets.reduce((largest, current) =>
            current.value > largest.value ? current : largest
        )
        : null;
}
// Function two : Asset Allocation Percentage
export function calculateAssetAllocation(assets: Asset[]): AssetAllocation {
  if (!assets || assets.length === 0) {
    return {};
  }

  const total = assets.reduce((sum, a) => sum + a.value, 0);
  if (total === 0) {
    return {};
  }

  const allocation = assets.reduce<AssetAllocation>((acc, asset) => {
    const share = (asset.value / total) * 100;
    acc[asset.category] = (acc[asset.category] || 0) + share;
    return acc;
  }, {});

  //This will normalize and round values to 2 decimals
  return Object.fromEntries(
    Object.entries(allocation).map(([key, val]) => [key, +val.toFixed(2)])
  );
}
