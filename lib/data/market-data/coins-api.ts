import { type TableAsset } from '@/components/dashboard/full-asset-columns';
import { type ShortTableAsset } from '@/components/search-asset/short-asset-columns';
import {
  formatDailyChange,
  formatPrice,
} from '@/lib/data/market-data/formatters';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { unstable_noStore as noStore } from 'next/cache';

const marketDataClient = new CoinGeckoClient({
  autoRetry: true,
});

export async function getTrendingCoins(): Promise<TableAsset[] | undefined> {
  const { coins } = await marketDataClient.trending();

  return coins?.map(({ item }) => {
    const formattedPrice = formatPrice(item?.data?.price);

    const formattedChange = formatDailyChange(
      item?.data?.price_change_percentage_24h?.usd,
    );

    const formattedCap = Number(
      item?.data?.market_cap?.replace('$', '').replace(/,/g, ''),
    );

    return {
      id: item?.id,
      name: item?.name,
      price: formattedPrice,
      icon: item?.thumb,
      cap: formattedCap,
      change: formattedChange,
    };
  });
}

export async function getCoinById(id: string) {
  const { market_data, name, image, symbol, description } =
    await marketDataClient.coinId({ id });

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
}

export async function getAllCoins(
  vs_currency = 'usd',
): Promise<TableAsset[] | undefined> {
  const coins = await marketDataClient.coinMarket({
    vs_currency,
  });

  return coins?.map((coin) => {
    const {
      id,
      name,
      current_price,
      market_cap,
      price_change_percentage_24h,
      image,
    } = coin;
    const formattedPrice = '$' + current_price;

    const formattedChange = formatDailyChange(price_change_percentage_24h);

    return {
      id,
      name,
      price: formattedPrice,
      icon: image,
      originalCap: market_cap,
      cap: market_cap,
      change: formattedChange,
    };
  });
}
