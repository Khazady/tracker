'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { State, updateUser } from '@/lib/actions/user';
import { User } from 'next-auth';
import { useFormState } from 'react-dom';

const initialState = {} as State;

export function SettingsForm({ profile }: { profile: Omit<User, 'id'> }) {
  const [state, dispatch] = useFormState(updateUser, initialState);

  return (
    <form action={dispatch}>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            defaultValue={profile.email ?? undefined}
            errors={state.errors?.email}
          />
          <p className="col-span-2 text-sm text-muted-foreground">
            This is your login email.
          </p>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Update settings
      </Button>
    </form>
  );
}
