import { Icons } from '../ui/icons';

const Sidebar = () => (
  <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
    <div className="absolute inset-0 bg-zinc-900" />
    <div className="relative z-20 flex items-center text-lg font-medium">
      <Icons.logo />
      Portfolio Tracker
    </div>
    <div className="relative z-20 mt-auto">
      <blockquote className="space-y-2">
        <p className="text-lg">
          &ldquo;Risk comes from not knowing what you&apos;re doing.&rdquo;
        </p>
        <footer className="text-sm">Warren Buffett</footer>
      </blockquote>
    </div>
  </div>
);

export default Sidebar;
