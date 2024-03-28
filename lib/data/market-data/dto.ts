import type { ShortTableAsset, TableAsset } from '@/lib/schemes/asset.scheme';
import { TrendingResponse } from 'coingecko-api-v3';
import { CoinMarket, SearchResponse } from 'coingecko-api-v3/dist/Interface';

export function translateTrendingToTableAsset(
  trending: TrendingResponse['coins'],
): TableAsset[] {
  if (!trending) return [];

  return trending.reduce((acc: TableAsset[], { item }) => {
    const numberCap = Number(
      item?.data?.market_cap?.replace('$', '').replace(/,/g, ''),
    );

    // skip broken data
    if (
      !item ||
      !item.data ||
      !item.id ||
      !item.name ||
      !item.data.price ||
      !item.data.price_change_percentage_24h
    ) {
      return acc;
    }

    acc.push({
      id: item.id,
      name: item.name,
      symbol: item.symbol || item.id.toUpperCase(),
      price: item.data.price,
      icon: item.thumb,
      cap: numberCap,
      change: item.data.price_change_percentage_24h.usd,
    });

    return acc;
  }, []);
}

export function translateMarketToShortTableAsset(
  marketCoins: CoinMarket[],
): ShortTableAsset[] {
  if (!marketCoins) return [];

  return marketCoins.reduce((acc: ShortTableAsset[], coin) => {
    const { id, name, image } = coin;

    // skip broken data
    if (!id || !name) {
      return acc;
    }

    return acc.concat({
      id,
      name,
      icon: image,
    });
  }, []);
}

export function translateSearchToShortTableAsset(
  searchedCoins: SearchResponse['coins'],
): ShortTableAsset[] {
  if (!searchedCoins) return [];

  return searchedCoins.reduce((acc: ShortTableAsset[], coin) => {
    const { id, name, large } = coin;

    // skip broken data
    if (!id || !name) {
      return acc;
    }

    return acc.concat({
      id,
      name,
      icon: large,
    });
  }, []);
}
