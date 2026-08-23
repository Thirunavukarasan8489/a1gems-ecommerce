import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function getSession() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    if (process.env.NODE_ENV === 'development') {
      return { userId: '000000000000000000000000', role: 'SUPER_ADMIN', name: 'Dev Admin' };
    }
    return null;
  }
  
  return {
    userId: session.user.id || '000000000000000000000000',
    role: session.user.role || 'CUSTOMER',
    name: session.user.name || 'User'
  };
}
