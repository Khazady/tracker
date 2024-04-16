import { cn } from '@/lib/utils';

export default function ChangeCell({
  change,
  isArrowFormat,
  className,
}: {
  change: string;
  isArrowFormat?: boolean;
  className?: string;
}) {
  const isNegative = change.includes('-');
  const changeClass = cn(className, {
    'text-red-500': isNegative,
    'text-green-500': !isNegative,
  });
  if (isArrowFormat) {
    const arrowIcon = isNegative ? '↓' : '↑';
    const removedMinusChange = change.replace('-', '');
    return (
      <div className={changeClass}>
        <span>{arrowIcon}</span>
        {removedMinusChange}
      </div>
    );
  }
  return (
    <div className={changeClass}>
      <span className="text-right">{change}</span>
    </div>
  );
}
