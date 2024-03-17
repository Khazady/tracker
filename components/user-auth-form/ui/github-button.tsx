import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signIn } from 'auth';
import { useState } from 'react';

export default function GithubButton({ isLoading }: { isLoading: boolean }) {
  const [isGithubLoading, setIsGithubLoading] = useState(isLoading);
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        setIsGithubLoading(true);
        signIn('github');
      }}
      disabled={isLoading || isGithubLoading}
    >
      {isGithubLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.gitHub className="mr-2 h-4 w-4" />
      )}
      GitHub
    </Button>
  );
}
