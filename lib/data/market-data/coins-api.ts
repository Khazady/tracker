import {
  translateMarketToShortTableAsset,
  translateSearchToShortTableAsset,
  translateTrendingToTableAsset,
} from '@/lib/data/market-data/dto';
import { formatDailyChange } from '@/lib/data/market-data/formatters';
import type { ShortTableAsset, TableAsset } from '@/lib/schemes/asset.scheme';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { unstable_noStore as noStore } from 'next/cache';

const marketDataClient = new CoinGeckoClient({
  autoRetry: false,
});

export async function getTrendingCoins(): Promise<TableAsset[]> {
  const { coins } = await marketDataClient.trending();

  return translateTrendingToTableAsset(coins);
}

export async function getCoinById(id: string) {
  try {
    const coin = await marketDataClient.coinId({ id });

    const { market_data, name, image, symbol, description } = coin;

    const formattedChange = formatDailyChange(
      market_data?.price_change_percentage_24h,
    );

    return {
      name: name,
      image: image,
      symbol: symbol,
      price: market_data?.current_price?.usd + '$',
      description: description?.en,
      change: formattedChange,
    };
  } catch (error) {
    return undefined;
  }
}

export async function getAllShortCoins(
  vs_currency = 'usd',
): Promise<ShortTableAsset[]> {
  const coins = await marketDataClient.coinMarket({
    vs_currency,
    per_page: 25,
    order: 'market_cap_desc',
    sparkline: false,
  });

  return translateMarketToShortTableAsset(coins);
}

export async function searchCoins(query: string): Promise<ShortTableAsset[]> {
  noStore();
  const response = await marketDataClient.search({ query });
  return translateSearchToShortTableAsset(response.coins);
}
