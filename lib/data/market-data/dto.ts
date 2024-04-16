import type { AssetType, ShortAssetType } from '@/lib/schemes/asset.scheme';
import { PositionWithMarkedData } from '@/lib/schemes/position.scheme';
import { Position } from '@prisma/client';
import { TrendingResponse } from 'coingecko-api-v3';
import { CoinMarket, SearchResponse } from 'coingecko-api-v3/dist/Interface';

export function translateTrendingToTableAsset(
  trending: TrendingResponse['coins'],
): AssetType[] {
  if (!trending) return [];

  return trending.reduce((acc: AssetType[], { item }) => {
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
): ShortAssetType[] {
  if (!marketCoins) return [];

  return marketCoins.reduce((acc: ShortAssetType[], coin) => {
    const { id, name, image, symbol } = coin;

    // skip broken data
    if (!id || !name || !symbol) {
      return acc;
    }

    return acc.concat({
      id,
      name,
      symbol,
      icon: image,
    });
  }, []);
}

export function uniteMarketDataAndPositions(
  marketCoins: CoinMarket[],
  positions: Position[],
): PositionWithMarkedData[] {
  if (!marketCoins.length || !positions.length) return [];

  return positions.reduce((result: PositionWithMarkedData[], position) => {
    const matchingMarketData = marketCoins.find(
      (data) => data.id === position.assetId,
    );
    if (!matchingMarketData) return result;

    const { id, current_price } = matchingMarketData;

    const { buyInPrice, units } = position;

    // skip broken data
    if (!id || !current_price) {
      return result;
    }

    const capitalInvested = buyInPrice * units;
    const currentPosition = current_price * units;
    const profitLossCurrency = currentPosition - capitalInvested;

    result.push({
      ...position,
      capitalInvested,
      icon: matchingMarketData?.image,
      currentPrice: current_price,
      currentPosition,
      profitLossCurrency,
      profitLossPercent: (profitLossCurrency / capitalInvested) * 100,
    });
    return result;
  }, []);
}

export function translateSearchToShortTableAsset(
  searchedCoins: SearchResponse['coins'],
): ShortAssetType[] {
  if (!searchedCoins) return [];

  return searchedCoins.reduce((acc: ShortAssetType[], coin) => {
    const { id, name, large, symbol } = coin;

    // skip broken data
    if (!id || !name || !symbol) {
      return acc;
    }

    return acc.concat({
      id,
      name,
      symbol,
      icon: large,
    });
  }, []);
}
