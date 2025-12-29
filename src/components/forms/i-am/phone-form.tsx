'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { useCurrentUser, useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const phoneSchema = z.object({
  phone: z.string().min(11, 'Номер телефона должен содержать 11 цифр'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

type PhoneFormProps = {
  onClose: () => void;
};

// Функция для форматирования телефона в строку
function formatPhoneToString(phone: number | null): string {
  if (!phone) return '';
  return phone.toString();
}

export default function PhoneForm({ onClose }: PhoneFormProps) {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  // Заполняем форму данными пользователя
  useEffect(() => {
    if (user) {
      form.reset({
        phone: formatPhoneToString(user.phone),
      });
    }
  }, [user, form]);

  const onSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync({
        phone: parseInt(data.phone.replace(/\D/g, '')),
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <PhoneInput
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
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
