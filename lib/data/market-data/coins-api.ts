import {
  translateMarketToShortTableAsset,
  translateSearchToShortTableAsset,
  translateTrendingToTableAsset,
} from '@/lib/data/market-data/dto';
import type { AssetType, ShortAssetType } from '@/lib/schemes/asset.scheme';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { unstable_noStore as noStore } from 'next/cache';

const marketDataClient = new CoinGeckoClient({
  autoRetry: false,
});

export async function getTrendingCoins(): Promise<AssetType[]> {
  const { coins } = await marketDataClient.trending();

  return translateTrendingToTableAsset(coins);
}

export async function getCoinById(
  id: string,
): Promise<AssetType & { description?: string }> {
  try {
    const coin = await marketDataClient.coinId({ id });

    const { market_data, name, image, symbol, description } = coin;

    if (
      !id ||
      !name ||
      !symbol ||
      !market_data?.current_price?.usd ||
      !market_data?.price_change_percentage_24h
    ) {
      throw new Error('Broken data');
    }

    return {
      id: id,
      name: name,
      icon: image?.small,
      symbol: symbol,
      price: market_data.current_price?.usd,
      description: description?.en,
      change: market_data.price_change_percentage_24h,
      cap: 0,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAllShortCoins(
  vs_currency = 'usd',
): Promise<ShortAssetType[]> {
  const coins = await marketDataClient.coinMarket({
    vs_currency,
    per_page: 25,
    order: 'market_cap_desc',
    sparkline: false,
  });

  return translateMarketToShortTableAsset(coins);
}

export async function searchCoins(query: string): Promise<ShortAssetType[]> {
  noStore();
  const response = await marketDataClient.search({ query });
  return translateSearchToShortTableAsset(response.coins);
}

export async function getAllCoinsByIds(ids: string[], vs_currency = 'usd') {
  const idsString = ids.join(',');
  return await marketDataClient.coinMarket({
    ids: idsString,
    vs_currency,
    sparkline: false,
  });
}
