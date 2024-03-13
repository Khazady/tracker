'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import SubmitButton from './submit-button';

interface AuthFieldsFormProps extends HTMLAttributes<HTMLDivElement> {
  errors?: { email?: string[]; password?: string[] };
}

export default function AuthFields({
  className,
  errors,
  ...props
}: AuthFieldsFormProps) {
  const { pending } = useFormStatus();
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={pending}
          errors={errors?.email}
        />
        <Label className="sr-only" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          placeholder="Your password"
          type="password"
          required
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={pending}
          errors={errors?.password}
        />
        <SubmitButton />
      </div>
    </div>
  );
}
