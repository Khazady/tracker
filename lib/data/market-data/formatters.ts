export function checkBuggedPrice(price: string | undefined) {
  const buggedPriceMatch = price?.match(/title="([\d.]+)"/);
  if (buggedPriceMatch) {
    const price = parseFloat(buggedPriceMatch[1]).toString();
    return '$' + parseFloat(price);
  }
  return price;
}

export function formatDailyChange(change: number | undefined) {
  if (change) {
    const fixedChange = change.toFixed(2);

    return fixedChange + '%';
  }
}
