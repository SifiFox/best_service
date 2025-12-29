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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCities } from '@/entities/city';
import { useCurrentUser, useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const citySchema = z.object({
  city: z.string().min(1, 'Выберите город'),
});

type CityFormData = z.infer<typeof citySchema>;

type CityFormProps = {
  onClose: () => void;
};

export default function CityForm({ onClose }: CityFormProps) {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { data: cities, isLoading: citiesLoading } = useCities();

  const form = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: user?.city_id?.toString() || '',
    },
  });

  // Заполняем форму данными пользователя
  useEffect(() => {
    if (user) {
      form.reset({
        city: String(user.city_id) || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: CityFormData) => {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync({
        city_id: parseInt(data.city),
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Город</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {citiesLoading ? (
                    <SelectItem disabled value="loading">
                      Загрузка городов...
                    </SelectItem>
                  ) : (
                    cities?.map(city => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {city.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button className="flex-1" disabled={isLoading || citiesLoading} type="submit">
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
