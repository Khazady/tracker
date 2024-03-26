import { assetsTableColumns } from '@/components/assets-table/assets-table-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllCoins } from '@/lib/data/market-data/coins-api';

export default async function AllAssetsTable() {
  const data = await getAllCoins();
  const defaultSorting = [{ id: 'cap', desc: true }];
  return (
    <DataTable
      columns={assetsTableColumns}
      data={data || []}
      defaultSorting={defaultSorting}
    />
  );
}
