import { columns } from '@/components/search-asset/short-asset-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { searchCoins } from '@/lib/data/market-data/coins-api';

export default async function SearchAssetTable({ query }: { query: string }) {
  const data = await searchCoins(query);
  const defaultSorting = [{ id: 'cap', desc: true }];
  return (
    <DataTable
      columns={columns}
      data={data || []}
      defaultSorting={defaultSorting}
    />
  );
}
