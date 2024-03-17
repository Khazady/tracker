'use client';

import NonFieldError from '@/components/ui/non-field-error';
import AuthFields from '@/components/user-auth-form/ui/auth-fields';
import GithubButton from '@/components/user-auth-form/ui/github-button';
import Separator from '@/components/user-auth-form/ui/separator';
import { register } from '@/lib/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';

export default function RegistrationForm() {
  const initialState = { errors: {}, message: '' };
  const [state, dispatch] = useFormState(register, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-6">
      <form action={dispatch}>
        <AuthFields errors={state.errors} />
        <NonFieldError message={state.message} />
      </form>
      <Separator />
      <GithubButton isLoading={pending} />
    </div>
  );
}
