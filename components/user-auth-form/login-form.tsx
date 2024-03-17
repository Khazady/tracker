'use client';

import AuthFields from '@/components/user-auth-form/ui/auth-fields';
import GithubButton from '@/components/user-auth-form/ui/github-button';
import Separator from '@/components/user-auth-form/ui/separator';
import { authenticate } from '@/lib/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import NonFieldError from '../ui/non-field-error';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-6">
      <form action={dispatch}>
        <AuthFields />
        <NonFieldError message={errorMessage} />
      </form>
      <Separator />
      <GithubButton isLoading={pending} />
    </div>
  );
}
