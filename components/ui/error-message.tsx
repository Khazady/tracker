import * as React from 'react';

export default function ErrorMessage(props: {
  message: string | null | undefined;
}) {
  const { message } = props;
  return message && <p className="mt-2 text-sm text-red-500">{message}</p>;
}

export function Errors(props: { errors?: string[]; id?: string }) {
  const { errors, id } = props;
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error: string) => (
          <ErrorMessage key={error} message={error} />
        ))}
    </div>
  );
}
