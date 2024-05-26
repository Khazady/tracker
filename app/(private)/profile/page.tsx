import { ProfileForm } from '@/components/profile/profile-form';
import Separator from '@/components/user-auth-form/ui/separator';
import { auth } from 'auth';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm profile={session.user} />
    </main>
  );
}
