import ErrorMessage from '@/components/ui/error-message';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div id={props.id} aria-live="polite" aria-atomic="true">
          {errors &&
            errors.map((error: string) => (
              <ErrorMessage key={error} message={error} />
            ))}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
