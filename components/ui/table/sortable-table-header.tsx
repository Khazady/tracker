import { Button } from '@/components/ui/button';
import { Column } from '@tanstack/table-core';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface TableHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export default function SortableTableHeader<TData, TValue>(
  props: TableHeaderProps<TData, TValue>,
) {
  const { column, title, className } = props;
  const handleSort = () => column.toggleSorting(column.getIsSorted() === 'asc');

  return (
    <div className={className}>
      <Button
        variant="ghost"
        onClick={handleSort}
        className="-ml-3 h-8 p-2 data-[state=open]:bg-accent"
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDown className="ml-2 h-4 w-4 text-primary" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4 text-primary" />
        ) : (
          <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
