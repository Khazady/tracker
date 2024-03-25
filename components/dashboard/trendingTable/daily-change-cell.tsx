import { cn } from '@/lib/utils';

export default function DailyChangeCell({
  change,
  className,
}: {
  change: string;
  className?: string;
}) {
  const isNegative = change.includes('-');
  const changeClass = cn(className, {
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
