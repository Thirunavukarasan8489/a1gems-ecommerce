import CustomAdminLayout from '@/components/admin/layout/AdminLayout';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const validRoles = ['SUPER_ADMIN', 'CONTENT_MANAGER', 'LEAD_MANAGER'];
  if (!validRoles.includes(session.user?.role as string)) {
    redirect('/');
  }

  return (
    <CustomAdminLayout>
      {children}
    </CustomAdminLayout>
  );
}
