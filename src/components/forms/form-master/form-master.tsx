'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { normalizePhoneNumber } from '@/lib/phone';
import { type MasterFormData, masterFormSchema } from '@/lib/validations/master';

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
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

import { useCreateAsk } from '@/entities/ask/hooks/use-ask';
import ApproveCheckbox from '@/shared/approve-checkbox/approve-checkbox';

export default function FormMaster({ onSuccess }: { onSuccess?: () => void }) {
  const createAskMutation = useCreateAsk();

  const form = useForm<MasterFormData>({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: MasterFormData) => {
    try {
      await createAskMutation.mutateAsync({
        phone: normalizePhoneNumber(data.phone),
        name: data.name || null,
        email: data.email || null,
        message: data.message || null,
      });

      toast.success('Заявка на вызов мастера отправлена!');
      form.reset();
      onSuccess?.();
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  const isFormValid = form.formState.isValid && form.watch('phone').length > 0;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон *</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
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
                <Input placeholder="user@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание проблемы</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Опишите, что нужно починить или установить..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ApproveCheckbox id="master-approve">
          <span className="text-sm text-gray-600">
            Нажимая кнопку, вы даете{' '}
            <span className="text-primary cursor-pointer underline">
              согласие на обработку персональных данных
            </span>
          </span>
        </ApproveCheckbox>

        <Button
          className="w-full"
          disabled={!isFormValid || createAskMutation.isPending}
          type="submit"
        >
          {createAskMutation.isPending ? 'Отправка...' : 'Вызвать мастера'}
        </Button>
      </form>
    </Form>
  );
}
