import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign In with Email
    </Button>
  );
}
