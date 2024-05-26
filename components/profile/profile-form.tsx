'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ProfileState, updateUserProfile } from '@/lib/actions/user';
import { User } from 'next-auth';
import { useFormState } from 'react-dom';

const initialState = {} as ProfileState;

export function ProfileForm({ profile }: { profile: Omit<User, 'id'> }) {
  const [state, dispatch] = useFormState(updateUserProfile, initialState);

  return (
    <form action={dispatch}>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            User Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            defaultValue={profile.name ?? undefined}
            errors={state.errors?.name}
          />
          <p className="col-span-2 text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym.
          </p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="picture" className="col-span-1 text-right">
            Picture
          </Label>
          <Input
            id="image"
            type="file"
            name="image"
            className="col-span-3"
            errors={state.errors?.image}
          />
          <p className="col-span-2 text-sm text-muted-foreground">
            This is your public avatar picture.
          </p>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Update profile
      </Button>
    </form>
  );
}
