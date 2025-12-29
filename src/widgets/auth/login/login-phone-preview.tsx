'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { loginPhoneSchema, verifySmsSchema } from '@/lib/validations/login-phone';

import FormSendCode from '@/components/forms/form-send-code/form-send-code';
import FormVerifyCode from '@/components/forms/form-verify-code/form-verify-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { loginPhone, verifySms } from '@/auth/nextjs/actions';
import { setAuthCookies } from '@/auth/nextjs/cookie-actions';

type Step = 'phone' | 'sms';

export default function LoginPhonePreview() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const phoneForm = useForm<z.infer<typeof loginPhoneSchema>>({
    resolver: zodResolver(loginPhoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const smsForm = useForm<z.infer<typeof verifySmsSchema>>({
    resolver: zodResolver(verifySmsSchema),
    defaultValues: {
      phone: '',
      smsCode: '',
    },
  });

  async function onSubmitPhone(values: z.infer<typeof loginPhoneSchema>) {
    try {
      const result = await loginPhone(values);
      if (result.success) {
        setPhoneNumber(values.phone);
        smsForm.setValue('phone', values.phone);
        setStep('sms');
        toast.success('СМС код отправлен на ваш номер!');
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              phoneForm.setError(field as keyof typeof values, {
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

  const handleBackToPhone = () => {
    setStep('phone');
    smsForm.reset();
  };

  return (
    <div className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center px-4">
      <Card className="mx-auto h-fit max-w-sm min-w-full px-2 py-8 lg:min-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-2xl">
            {step === 'phone' ? 'Войти по номеру телефона' : 'Введите код из СМС'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <FormSendCode onSubmitPhone={onSubmitPhone} phoneForm={phoneForm} />
          ) : (
            <FormVerifyCode
              handleBackToPhone={handleBackToPhone}
              onSubmitSms={onSubmitSms}
              phoneNumber={phoneNumber}
              smsForm={smsForm}
            />
          )}
          <div className="mt-4 flex flex-col gap-4 text-left text-sm">
            <Link className="underline" href="/login">
              Войти по паролю
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
