'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { vacancySchema } from '@/lib/validations/vacancy';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCities } from '@/entities/city';
import { vacancyApi } from '@/entities/vacancy/api/vacancy-api';
import ApproveCheckbox from '@/shared/approve-checkbox/approve-checkbox';

const formSchema = vacancySchema;

export default function FormVacancy() {
  const [isApproved, setIsApproved] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      name: '',
      city: '',
    },
  });
  const { data: cities } = useCities();

  // Проверяем валидность формы
  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  // Кнопка отключена если форма невалидна, не принята галочка или идет отправка
  const isButtonDisabled = !isFormValid || !isApproved || isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = Object.fromEntries(
        Object.entries({
          phone: data.phone,
          name: data.name,
          city: Number(data.city),
        }).filter(
          ([_, value]) =>
            value !== undefined &&
            value !== null &&
            (typeof value !== 'string' || value.trim() !== '')
        )
      );

      await vacancyApi.createVacancy(payload as Parameters<typeof vacancyApi.createVacancy>[0]);
      toast.success('Заявка отправлена!');
      form.reset();
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-4 sm:space-y-8 sm:p-6 md:p-8 lg:p-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem id="form-main-city">
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full text-base sm:text-lg md:!text-xl !h-[80px]">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities?.map(city => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem id="form-main-phone">
                <FormControl>
                  <PhoneInput
                    className="h-[60px] text-base md:h-[80px] md:!text-xl xl:text-xl placeholder:text-base md:placeholder:text-xl"
                    onChange={field.onChange}
                    placeholder="Номер телефона"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem id="form-main-name">
                <FormControl>
                  <Input
                    placeholder="Ваше имя"
                    {...field}
                    className="bg-secondary h-[60px] text-base sm:h-[70px] sm:text-lg md:h-[80px] md:!text-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex max-w-full flex-col justify-between gap-4">
          <ApproveCheckbox id="approve_main" onChange={setIsApproved}>
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
            className="h-[60px] w-full text-base sm:h-[70px] sm:text-lg md:h-[80px] md:w-auto md:px-12 md:text-xl"
            disabled={isButtonDisabled}
            type="submit"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
