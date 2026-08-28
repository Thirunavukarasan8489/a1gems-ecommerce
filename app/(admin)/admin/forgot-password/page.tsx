'use client';

import { useState } from 'react';
import { Mail, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setSubmitError(null);
    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, you would POST to /api/auth/forgot-password
      console.log('Sending password reset email to:', data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request failed', error);
      setSubmitError('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gold-50 dark:bg-gold-900 flex items-center justify-center p-4 selection:bg-gold-100 selection:text-gold-900">
      <div className="w-full max-w-md">
        {/* Logo/Branding Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gold-800 shadow-sm border border-gold-200 dark:border-gold-700 mb-4">
            <ShieldAlert className="text-gold-600 dark:text-gold-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gold-800 dark:text-white tracking-tight">A1 GEMS</h1>
          <p className="text-gold-500 dark:text-gold-400 mt-2 text-sm">Admin Password Reset</p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white dark:bg-gold-800 rounded-2xl shadow-xl shadow-gold-200/50 dark:shadow-gold-900/50 border border-gold-200/60 dark:border-gold-700/60 p-8">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gold-800 dark:text-white">Check your email</h2>
              <p className="text-gold-500 dark:text-gold-400 text-sm">
                We have sent a password reset link to your email address. Please check your inbox.
              </p>
              <div className="pt-4">
                <Link
                  href="/admin/login"
                  className="inline-flex justify-center items-center py-2 px-4 border border-gold-300 dark:border-gold-600 rounded-lg shadow-sm text-sm font-medium text-gold-700 dark:text-gold-300 bg-white dark:bg-gold-800 hover:bg-gold-50 dark:hover:bg-gold-700 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="text-center mb-6">
                <p className="text-sm text-gold-600 dark:text-gold-400">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              {submitError && (
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                  {submitError}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gold-700 dark:text-gold-300 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gold-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`block w-full pl-10 pr-3 py-2.5 bg-gold-50 dark:bg-gold-900/50 border ${
                      errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gold-200 dark:border-gold-700 focus:ring-gold-500 focus:border-gold-500'
                    } rounded-lg text-gold-900 dark:text-white placeholder-gold-400 focus:outline-none focus:ring-2 transition-colors sm:text-sm`}
                    placeholder="admin@a1gems.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all dark:focus:ring-offset-gold-900"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <div className="text-center mt-4">
                <Link
                  href="/admin/login"
                  className="text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-900 dark:hover:text-white transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gold-500 dark:text-gold-400">
          Secure portal for authorized personnel only. <br />
          &copy; {new Date().getFullYear()} A1 Gems Platform.
        </p>
      </div>
    </div>
  );
}
