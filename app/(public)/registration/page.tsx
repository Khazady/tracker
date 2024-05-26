import LinkSwitch from '@/components/login/link-switch';
import Sidebar from '@/components/login/sidebar';
import RegistrationForm from '@/components/user-auth-form/registration-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
};

export default function RegisterPage() {
  return (
    <div className="container relative grid h-[800px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LinkSwitch />
      <Sidebar />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
