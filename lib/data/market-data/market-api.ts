import { TableAsset } from '@/components/dashboard/trendingTable/columns';
import {
  checkBuggedPrice,
  formatDailyChange,
} from '@/lib/data/market-data/formatters';
import { CoinGeckoClient } from 'coingecko-api-v3';

const marketDataClient = new CoinGeckoClient({
  autoRetry: true,
});

export async function getTrending(): Promise<TableAsset[] | undefined> {
  const { coins } = await marketDataClient.trending();

  const formatted = coins?.map(({ item }) => {
    const formattedPrice = checkBuggedPrice(item?.data?.price);

    const formattedChange = formatDailyChange(
      item?.data?.price_change_percentage_24h?.usd,
    );

    return {
      name: item?.name,
      price: formattedPrice,
      icon: item?.thumb,
      cap: item?.data?.market_cap,
      change: formattedChange,
    };
  });

  return formatted;
}
