import { Errors } from '@/components/ui/error-message';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, type, errors, hidden, ...props }, ref) => {
    return (
      <div
        className={cn([
          'flex flex-col gap-1',
          wrapperClassName,
          { hidden: hidden },
        ])}
      >
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          hidden={hidden}
          ref={ref}
          {...props}
        />
        <Errors errors={errors} id={props.id} />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
