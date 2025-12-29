'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { loginSchema } from '@/lib/validations/login';
import { verifySmsSchema } from '@/lib/validations/login-phone';

import FormLogin from '@/components/forms/form-login/form-login';
import FormVerifyCode from '@/components/forms/form-verify-code/form-verify-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { login, verifySms } from '@/auth/nextjs/actions';
import { setAuthCookies } from '@/auth/nextjs/cookie-actions';

import { AUTH_ERRORS } from '../constants';

const formSchema = loginSchema;

export default function LoginPreview() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'code'>('login');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const smsForm = useForm<z.infer<typeof verifySmsSchema>>({
    resolver: zodResolver(verifySmsSchema),
    defaultValues: {
      phone: '',
      smsCode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await login(values);
      if (result.success) {
        if (result.data) {
          await setAuthCookies(
            result.data.access_token,
            result.data.refresh_token,
            result.data.user_id?.toString()
          );
        }
        toast.success('Успешная авторизация!');
        router.push('/');
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(field as keyof typeof values, {
                message: errors[0],
              });
            }
          });
        }
        if (result.error) {
          if (result.error && result.error === AUTH_ERRORS.unconfirmed_phone_number) {
            smsForm.setValue('phone', values.username);
            setStep('code');
            toast.error(
              'Учетная запись не подтверждена, необходимо подтвердить номер телефона кодом из SMS'
            );
            return;
          }
          toast.error(result.error);
        }
      }
    } catch {
      toast.error('Произошла ошибка при отправке формы. Попробуйте еще раз.');
    }
  }

  async function onSubmitSms(values: z.infer<typeof verifySmsSchema>) {
    try {
      const result = await verifySms(values);
      if (result.success) {
        if (result.data) {
          await setAuthCookies(
            result.data.access_token,
            result.data.refresh_token,
            result.data.user_id.toString()
          );
        }

        toast.success('Успешная авторизация!');
        router.push('/profile');
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              smsForm.setError(field as keyof typeof values, {
                message: errors[0],
              });
            }
          });
        }
        if (result.error) {
          toast.error(result.error);
        }
      }
    } catch {
      toast.error('Произошла ошибка при отправке формы. Попробуйте еще раз.');
    }
  }

  return (
    <div className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center px-4">
      <Card className="mx-auto h-fit max-w-sm min-w-full px-2 py-8 lg:min-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-2xl">Войти</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'login' ? (
            <FormLogin form={form} onSubmit={onSubmit} />
          ) : (
            <FormVerifyCode
              handleBackToPhone={() => setStep('login')}
              onSubmitSms={onSubmitSms}
              phoneNumber={form.getValues('username')}
              smsForm={smsForm}
            />
          )}
          <div className="mt-4 flex flex-col gap-4 text-left text-sm">
            <Link className="underline" href="/login-phone">
              Войти по коду из SMS
            </Link>
            <Link className="underline" href="/register">
              Зарегистрироваться
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
