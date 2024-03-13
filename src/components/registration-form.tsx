'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/lib/actions/authentication';

import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function RegistrationForm({ className, ...props }: UserAuthFormProps) {
  const [state, dispatch] = useFormState(register, {
    errors: {},
    message: '',
  });

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
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              errors={state.errors?.email}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Your password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              errors={state.errors?.password}
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
