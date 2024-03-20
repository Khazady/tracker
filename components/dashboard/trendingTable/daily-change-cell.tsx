import { cn } from '@/lib/utils';

export default function DailyChangeCell({ change }: { change: string }) {
  const isNegative = change.includes('-');
  const changeClass = cn('text-right', {
    'text-red-500': isNegative,
    'text-green-500': !isNegative,
  });
  const arrowIcon = isNegative ? '↓' : '↑';
  const removedMinusChange = change.replace('-', '');
  return (
    <div className={changeClass}>
      <span>{arrowIcon}</span>
      {removedMinusChange}
    </div>
  );
}
