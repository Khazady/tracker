import { columns } from '@/components/portfolio/transaction-columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllTransactions } from '@/lib/actions/transactions';

export default async function TransactionTable() {
  const data = await getAllTransactions();
  const defaultSorting = [{ id: 'change', desc: true }];
  return (
    <DataTable columns={columns} data={data} defaultSorting={defaultSorting} />
  );
}
