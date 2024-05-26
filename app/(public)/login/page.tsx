import LinkSwitch from '@/components/login/link-switch';
import Sidebar from '@/components/login/sidebar';
import LoginForm from '@/components/user-auth-form/login-form';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LinkSwitch isLoginPage />
      <Sidebar />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign in
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
