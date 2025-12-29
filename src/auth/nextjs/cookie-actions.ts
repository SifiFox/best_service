'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setAuthCookies(accessToken: string, refreshToken: string, userId?: string) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });

  if (userId) {
    cookieStore.set('user_id', userId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });
  }
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return {
    access_token: cookieStore.get('access_token')?.value,
    refresh_token: cookieStore.get('refresh_token')?.value,
    user_id: cookieStore.get('user_id')?.value,
  };
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('user_id');
}

export async function serverLogout() {
  await clearAuthCookies();
  redirect('/');
}
