import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center space-y-4 py-6">
      <div className="flex items-center space-x-2">
        <span className="text-4xl font-extrabold tracking-tighter sm:text-6xl">
          404
        </span>
      </div>
      <p className="max-w-[600px] text-center text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
        The requested market asset could not be found.
      </p>
      <Link
        className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        href="/dashboard"
      >
        Back to the Dashboard Page
      </Link>
    </div>
  );
}
