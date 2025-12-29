'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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

import { useUpdateCurrentUser } from '@/entities/user/hooks/use-user';

const socialNetworksSchema = z.object({
  vk: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
});

type SocialNetworksFormData = z.infer<typeof socialNetworksSchema>;

type SocialNetworksFormProps = {
  onCloseAction: () => void;
};

export default function SocialNetworksForm({ onCloseAction }: SocialNetworksFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUpdateCurrentUser();
  const form = useForm<SocialNetworksFormData>({
    resolver: zodResolver(socialNetworksSchema),
    defaultValues: {
      vk: '',
      telegram: '',
      instagram: '',
    },
  });

  const onSubmit = async (data: SocialNetworksFormData) => {
    setIsLoading(true);
    try {
      const filledLinks = Object.values(data).filter(link => link && link.trim() !== '');
      await updateUser.mutateAsync({
        social_link: filledLinks,
      });

      toast.success('Данные успешно сохранены!', {
        position: 'bottom-center',
        duration: 2000,
      });
      onCloseAction();
    } catch {
      toast.error('Ошибка при сохранении!', {
        position: 'bottom-center',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="vk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ВКонтакте</FormLabel>
              <FormControl>
                <Input placeholder="Ссылка на профиль ВК" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram</FormLabel>
              <FormControl>
                <Input placeholder="@username или ссылка" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="Ссылка на профиль Instagram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button className="flex-1" disabled={isLoading} type="submit">
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button className="flex-1" onClick={onCloseAction} type="button" variant="outline">
            Отмена
          </Button>
        </div>
      </form>
    </Form>
  );
}
