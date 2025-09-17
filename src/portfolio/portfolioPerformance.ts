// This is Interface for portfolio performance output
export interface PortfolioResult {
  initialAmount: number;
  currentAmount: number;
  netChange: number;
  changePercentage: number;
  summary: string;
}

// This is Interface for individual assets
export interface PortfolioAsset {
  name: string;
  value: number;
  category: string;
}

// This is Interface for asset allocation percentages
export interface AllocationPercentages {
  [category: string]: number;
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
