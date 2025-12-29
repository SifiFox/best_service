'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useCurrentUser, useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const birthdaySchema = z.object({
  birthday: z.date({
    required_error: 'Дата рождения обязательна',
  }),
});

type BirthdayFormData = z.infer<typeof birthdaySchema>;

type BirthdayFormProps = {
  onClose: () => void;
};

// Функция для преобразования строки даты в Date
function parseDate(dateString: string | null): Date | undefined {
  if (!dateString) return undefined;
  try {
    return new Date(dateString);
  } catch {
    return undefined;
  }
}

export default function BirthdayForm({ onClose }: BirthdayFormProps) {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BirthdayFormData>({
    resolver: zodResolver(birthdaySchema),
    defaultValues: {
      birthday: new Date(),
    },
  });

  // Заполняем форму данными пользователя
  useEffect(() => {
    if (user) {
      const birthdayDate = parseDate(user.birth_date);
      if (birthdayDate) {
        form.reset({
          birthday: birthdayDate,
        });
      }
    }
  }, [user, form]);

  const onSubmit = async (data: BirthdayFormData) => {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync({
        birth_date: data.birthday.toISOString().split('T')[0], // Формат YYYY-MM-DD
      });

      toast.success('Данные успешно сохранены!', {
        position: 'bottom-center',
        duration: 2000,
      });
      onClose();
    } catch {
      toast.error('Ошибка при сохранении!', {
        position: 'bottom-center',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-destructive">Ошибка загрузки данных пользователя</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата рождения</FormLabel>
              <FormControl>
                <DatePicker
                  fromYear={1940}
                  onChange={field.onChange}
                  placeholder="Выберите дату рождения"
                  toYear={2024 - 16}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button className="flex-1" disabled={isLoading} type="submit">
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button className="flex-1" onClick={onClose} type="button" variant="outline">
            Отмена
          </Button>
        </div>
      </form>
    </Form>
  );
}
