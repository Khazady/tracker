import { CircleAlert } from 'lucide-react';
import ErrorMessage from './error-message';

export default function NonFieldError(props: {
  message: string | null | undefined;
  showExclamation?: boolean;
}) {
  const { message, showExclamation } = props;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="flex h-8 items-end space-x-1"
    >
      {showExclamation && message && (
        <CircleAlert className="h-5 w-5 text-red-500" />
      )}
      <ErrorMessage message={message} />
    </div>
  );
}
