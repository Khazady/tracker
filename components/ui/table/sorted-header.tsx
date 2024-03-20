import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

export default function SortedHeader({
  onSort,
  align = 'left',
}: {
  align?: 'left' | 'right' | 'center';
  onSort: () => void;
}) {
  const alignClass = cn('text-right', {
    'text-right': align === 'right',
    'text-left': align === 'left',
    'text-center': align === 'center',
  });
  return (
    <div className={alignClass}>
      <Button variant="ghost" onClick={onSort}>
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
