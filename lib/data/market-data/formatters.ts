export function checkBuggedPrice(price: string | undefined) {
  const buggedPriceMatch = price?.match(/title="([\d.]+)"/);
  if (buggedPriceMatch) {
    return '$' + buggedPriceMatch[1];
  }
  return price;
}

export function formatChangePercentage(change: number | undefined) {
  if (change) {
    const fixedChange = change.toFixed(2);

    return fixedChange + '%';
  }
  return '-';
}

export function formatMarketCap(cap: number | undefined) {
  if (cap) {
    let formatter = Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    });
    return formatter.format(cap);
  }
  return '-';
}

export function formatPrice(price: number | undefined) {
  if (!price) return '-';

  const moreThanThousand = price > 1000;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    minimumSignificantDigits: moreThanThousand ? undefined : 2,
    maximumSignificantDigits: moreThanThousand ? undefined : 4,
  }).format(price);
}
