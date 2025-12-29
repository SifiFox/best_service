'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { verifySmsSchema } from '@/lib/validations/login-phone';
import { registerSchema } from '@/lib/validations/register';

import FormRegister from '@/components/forms/form-register/form-register';
import FormVerifyCode from '@/components/forms/form-verify-code/form-verify-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { register, verifySms } from '@/auth/nextjs/actions';
import { setAuthCookies } from '@/auth/nextjs/cookie-actions';

const formSchema = registerSchema;

export default function RegisterPreview() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
      name: '',
      surname: '',
      email: '',
      city: '',
      password: '',
      confirmPassword: '',
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
      const result = await register(values);

      if (result.success) {
        smsForm.setValue('phone', values.phone);
        toast.success('Регистрация прошла успешно!');
        setStep('code');
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
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center px-4 py-10">
      <Card className="mx-auto max-w-sm min-w-full px-2 py-8 lg:min-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Зарегистрироваться</CardTitle>
          <CardDescription>
            {step === 'phone'
              ? 'Заполните форму ниже, чтобы создать новый аккаунт.'
              : 'Введите код из СМС, который был отправлен на ваш номер телефона.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <FormRegister form={form} onSubmit={onSubmit} />
          ) : (
            <FormVerifyCode
              handleBackToPhone={() => setStep('phone')}
              onSubmitSms={onSubmitSms}
              phoneNumber={form.getValues('phone')}
              smsForm={smsForm}
            />
          )}
          <div className="mt-4 text-center text-sm">
            Уже есть аккаунт?{' '}
            <Link className="underline" href="/login">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
