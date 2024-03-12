'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function RegistrationForm({ className, ...props }: UserAuthFormProps) {
  const [errorMessage, dispatch] = useFormState(() => {}, undefined);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={dispatch}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <RegistrationButton />
          </div>
        </div>
      </form>
    </div>
  );
}

function RegistrationButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign In with Email
    </Button>
  );
}
