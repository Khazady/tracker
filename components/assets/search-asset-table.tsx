import { columns } from '@/components/assets/short-asset-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllCoins, searchCoins } from '@/lib/data/market-data/coins-api';

export default async function SearchAssetTable({ query }: { query: string }) {
  const data = !query ? await getAllCoins() : await searchCoins(query);
  const defaultSorting = [{ id: 'cap', desc: true }];
  return (
    <DataTable
      columns={columns}
      data={data || []}
      defaultSorting={defaultSorting}
    />
  );
}
