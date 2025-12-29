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
import { Input } from '@/components/ui/input';

import { useCurrentUser, useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const userSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email адрес'),
});

type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
  onClose: () => void;
};

// Функция для парсинга full_name на имя и фамилию
function parseFullName(fullName: string | null): { firstName: string; lastName: string } {
  if (!fullName) return { firstName: '', lastName: '' };

  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0] || '', lastName: '' };
  }

  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ');

  return { firstName, lastName };
}

// Функция для объединения имени и фамилии в full_name
// function combineFullName(firstName: string, lastName: string): string {
//   return `${firstName} ${lastName}`.trim();
// }

export default function UserForm({ onClose }: UserFormProps) {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  // Заполняем форму данными пользователя
  useEffect(() => {
    if (user) {
      // Получаем full_name из first_name и last_name для обратной совместимости
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
      const { firstName, lastName } = parseFullName(fullName);

      form.reset({
        firstName,
        lastName,
        email: user.email || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync({
        // full_name: combineFullName(data.firstName, data.lastName),
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
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
          <div className="border-primary mx-auto h-6 w-6 animate-spin rounded-full border-b-2" />
          <p className="text-muted-foreground mt-2 text-sm">Загрузка данных...</p>
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Введите фамилию" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Введите email" type="email" {...field} />
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
