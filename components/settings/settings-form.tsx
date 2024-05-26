'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SettingsState, updateUserSettings } from '@/lib/actions/user';
import { User } from 'next-auth';
import { useFormState } from 'react-dom';

const initialState = {} as SettingsState;

export function SettingsForm({ profile }: { profile: Omit<User, 'id'> }) {
  const [state, dispatch] = useFormState(updateUserSettings, initialState);

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
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            errors={state.errors?.password}
          />
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Update settings
      </Button>
    </form>
  );
}
