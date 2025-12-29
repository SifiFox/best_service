'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { cn } from '@/lib/utils';
import { LoginFormSchema, loginPhoneSchema } from '@/lib/validations/login-phone';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { askApi } from '@/entities/ask/api/ask-api';
import ApproveCheckbox from '@/shared/approve-checkbox/approve-checkbox';

export default function FormAsk({ className }: { className?: string }) {
  const form = useForm<LoginFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginPhoneSchema),
    defaultValues: {
      phone: '',
    },
  });
  const [isApproved, setIsApproved] = useState(false);

  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isButtonDisabled = !isFormValid || !isApproved || isSubmitting;

  async function onSubmit(data: { phone: string }) {
    try {
      await askApi.createAsk({
        phone: data.phone,
        message: '(Лучший сервис)Заявка отправлена из формы "Есть вопросы по ремонту?"',
      });
      toast.success('Заявка отправлена!');
      form.reset();
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-[20px] bg-white px-4 py-6 md:px-6 md:py-7 2xl:px-8 2xl:py-4',
        className
      )}
    >
      <div className="flex w-full flex-col pt-4 pb-3 md:pt-4 md:pb-4 xl:pb-5">
        <h3 className="text-center text-xl font-semibold whitespace-normal text-black md:text-2xl xl:text-3xl">
          Есть вопросы по ремонту?
        </h3>

        <Form {...form}>
          <form
            className="space-y-3 pt-4 md:space-y-4 md:pt-5 xl:space-y-4 xl:pt-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem id="form-ask-phone">
                  <FormControl>
                    <PhoneInput
                      className="h-[38px] text-base md:h-[42px] md:!text-xl xl:h-[60px] xl:text-xl placeholder:text-lg md:placeholder:text-xl"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              rules={{ required: 'Укажите номер телефона' }}
            />

            <ApproveCheckbox id="approve" onChange={setIsApproved}>
              <span className="text-sm leading-5 text-gray-400">
                Нажимая кнопку, вы даете{' '}
                <Link
                  download="Политика обработки персональных данных (Лучший сервис).docx"
                  href="/files/privacy.docx"
                >
                  <span className="text-gradient-primary cursor-pointer underline">
                    согласие на обработку Персональных данных
                  </span>
                </Link>
              </span>
            </ApproveCheckbox>
            <Button
              className="h-[50px] w-full text-base md:h-[55px] md:text-lg lg:h-[60px] xl:h-[72px] xl:text-xl"
              disabled={isButtonDisabled}
              type="submit"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
