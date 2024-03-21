import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HeaderContext } from '@tanstack/table-core';
import { ArrowUpDown } from 'lucide-react';

export default function SortedHeader<TData, TValue>({
  column,
  align = 'left',
  title,
}: {
  align?: 'left' | 'right' | 'center';
  column: HeaderContext<TData, TValue>['column'];
  title: string;
}) {
  const handleSort = () => column.toggleSorting(column.getIsSorted() === 'asc');

  const alignClass = cn('text-right', {
    'text-right': align === 'right',
    'text-left': align === 'left',
    'text-center': align === 'center',
  });
  return (
    <div className={alignClass}>
      <Button variant="ghost" onClick={handleSort}>
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
