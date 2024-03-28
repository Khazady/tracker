'use client';

import {
  AutocompleteSearch,
  Option,
} from '@/components/ui/autocomplete-search';
import { searchCoins } from '@/lib/data/market-data/coins-api';
import { debounce } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function Search() {
  const [data, setData] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  //check if user on search assets page
  const pathname = usePathname();
  const isOnSearchPage = pathname === '/assets';
  if (isOnSearchPage) return null;

  const submitAllSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    push(`/assets?${params.toString()}`);
  };

  const submitSearch = (selectedId: string) => {
    push(`/assets/${selectedId}`);
  };

  const handleSearch = debounce(async (query: string) => {
    if (!query.length) return;
    setIsLoading(true);
    const coins = await searchCoins(query);
    setIsLoading(false);

    if (!coins) return;
    const formattedCoins = coins.map(({ id, name, icon }) => {
      return {
        value: id || '-',
        label: name || '-',
        icon: icon || '-',
      };
    });
    setData(formattedCoins);
  }, 300);

  return (
    <div>
      <AutocompleteSearch
        options={data}
        isLoading={isLoading}
        onInputChange={handleSearch}
        emptyMessage="No resulsts."
        placeholder="Search for stocks, etfs, or cryptos"
        onValueSelect={submitSearch}
        onAllSelect={submitAllSearch}
      />
    </div>
  );
}
