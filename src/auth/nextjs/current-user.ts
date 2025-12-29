import { redirect } from 'next/navigation';

import { userApi } from '@/entities/user/api/user-api';

export async function _getCurrentUser({ redirectIfNotAuth }: { redirectIfNotAuth: boolean }) {
  try {
    const user = await userApi.getCurrentUser();
    return user;
  } catch {
    if (redirectIfNotAuth) {
      return redirect('/login');
    }
    return null;
  }
}
