import { columns } from '@/components/assets/short-asset-columns';
import { DataTable } from '@/components/ui/table/data-table';
import {
  getAllShortCoins,
  searchCoins,
} from '@/lib/data/market-data/coins-api';

export default async function SearchAssetTable({ query }: { query: string }) {
  const data = !query ? await getAllShortCoins() : await searchCoins(query);
  const defaultSorting = [{ id: 'cap', desc: true }];
  return (
    <DataTable
      columns={columns}
      data={data || []}
      defaultSorting={defaultSorting}
    />
  );
}
