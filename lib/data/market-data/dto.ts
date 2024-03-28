import type { TableAsset } from '@/lib/schemes/asset.scheme';
import { TrendingResponse } from 'coingecko-api-v3';

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
      price: item.data.price,
      icon: item.thumb ?? null,
      cap: numberCap,
      change: item.data.price_change_percentage_24h.usd,
    });

    return acc;
  }, []);
}
