'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { verifySmsSchema } from '@/lib/validations/login-phone';
import { verifyPhoneSchema } from '@/lib/validations/verify-phone';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { verifySms } from '@/auth/nextjs/actions';

import { AUTH_ERRORS } from '../constants';

const formSchema = verifyPhoneSchema;

export default function VerifyPhone() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await verifySms(values as z.infer<typeof verifySmsSchema>);
      if (result.success) {
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
            toast.error(
              'Учетная запись не подтверждена, необходимо подтвердить номер телефона кодом из SMS'
            );
            router.push('/verify-phone');
            return;
          }
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
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="phone">Номер телефона</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? 'Вход...' : 'Подтвердить номер телефона'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
