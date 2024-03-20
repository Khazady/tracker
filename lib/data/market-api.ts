import { TableAsset } from '@/components/dashboard/trendingTable/columns';
import { CoinGeckoClient } from 'coingecko-api-v3';

const marketDataClient = new CoinGeckoClient({
  autoRetry: true,
});

export async function getTrending(): Promise<TableAsset[] | undefined> {
  const { coins } = await marketDataClient.trending();

  const formatted = coins?.map(({ item }) => ({
    name: item?.name,
    price: item?.data?.price,
    icon: item?.thumb,
    cap: item?.data?.market_cap,
    change: item?.data?.price_change_percentage_24h?.usd,
  }));

  return formatted;
}
