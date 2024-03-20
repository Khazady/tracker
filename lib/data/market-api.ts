import { TableAsset } from '@/components/dashboard/trendingTable/columns';
import { CoinGeckoClient } from 'coingecko-api-v3';

const marketDataClient = new CoinGeckoClient({
  autoRetry: true,
});

export async function getTrending(): Promise<TableAsset[] | undefined> {
  const { coins } = await marketDataClient.trending();

  const formatted = coins?.map(({ item }) => {
    const buggedPriceMatch = item?.data?.price?.match(/title="([\d.]+)"/);
    let formattedPrice;
    if (buggedPriceMatch) {
      const price = parseFloat(buggedPriceMatch[1]).toString();
      formattedPrice = '$' + parseFloat(price);
    }

    return {
      name: item?.name,
      price: formattedPrice || item?.data?.price,
      icon: item?.thumb,
      cap: item?.data?.market_cap,
      change: item?.data?.price_change_percentage_24h?.usd,
    };
  });

  return formatted;
}
