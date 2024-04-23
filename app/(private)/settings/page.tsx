import { ProfileForm } from '@/components/settings/profile-form';
import Separator from '@/components/user-auth-form/ui/separator';
import { auth } from 'auth';

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm profile={session.user} />
    </div>
  );
}
