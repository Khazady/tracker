import { columns } from '@/components/dashboard/full-asset-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getTrendingCoins } from '@/lib/data/market-data/coins-api';

export default async function TrendingTable() {
  const data = await getTrendingCoins();
  const defaultSorting = [{ id: 'change', desc: true }];
  return (
    <DataTable
      columns={columns}
      data={data || []}
      defaultSorting={defaultSorting}
    />
  );
}
