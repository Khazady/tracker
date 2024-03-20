export function checkBuggedPrice(price: string | undefined) {
  const buggedPriceMatch = price?.match(/title="([\d.]+)"/);
  if (buggedPriceMatch) {
    return '$' + buggedPriceMatch[1];
  }
  return price;
}

export function formatDailyChange(change: number | undefined) {
  if (change) {
    const fixedChange = change.toFixed(2);

    return fixedChange + '%';
  }
  return '-';
}

export function formatMarketCap(cap: string | undefined) {
  if (cap) {
    const numberCap = Number(cap.replace('$', '').replace(/,/g, ''));
    let formatter = Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    });
    return formatter.format(numberCap);
  }
  return '-';
}
