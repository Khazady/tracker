import { columns } from '@/components/portfolio/position-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllPositionsWithCurrentPrices } from '@/lib/actions/position';

export default async function PositionTable() {
  const data = await getAllPositionsWithCurrentPrices();
  const defaultSorting = [{ id: 'change', desc: true }];
  return (
    <DataTable columns={columns} data={data} defaultSorting={defaultSorting} />
  );
}
