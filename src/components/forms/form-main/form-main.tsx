'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { isValidPhoneNumber, normalizePhoneNumber } from '@/lib/phone';
import { oswaldStyle } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

import { useCreateAsk } from '@/entities/ask/hooks/use-ask';
import ApproveCheckbox from '@/shared/approve-checkbox/approve-checkbox';

const formMainSchema = z.object({
  phone: z.string().refine(isValidPhoneNumber, {
    message: 'Введите корректный номер телефона',
  }),
  name: z.string().optional(),
  message: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: 'Необходимо принять условия',
  }),
});

type FormMainData = z.infer<typeof formMainSchema>;

export default function FormMain() {
  const createAskMutation = useCreateAsk();

  const form = useForm<FormMainData>({
    resolver: zodResolver(formMainSchema),
    defaultValues: {
      phone: '',
      name: '',
      message: '',
      agreement: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormMainData) => {
    try {
      await createAskMutation.mutateAsync({
        phone: normalizePhoneNumber(data.phone),
        name: data.name || null,
        email: null,
        message: data.message || null,
      });

      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      form.reset({
        phone: '',
        name: '',
        message: '',
        agreement: false,
      });
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  const isFormValid = form.formState.isValid;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 sm:p-10 md:p-14">
      <div className="mx-auto flex flex-col gap-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl" style={oswaldStyle}>
            Не нашли то, что нужно?
          </h3>
          <Text className="block text-muted-foreground text-base sm:text-lg">
            Опишите задачу и вызовите мастера, мы поможем справиться с вашей проблемой.
          </Text>
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Row 1: Phone and Name */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput className="h-14 text-lg" placeholder="Телефон" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-14 text-lg bg-secondary border-none"
                        placeholder="Имя"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Message and (Privacy + Button) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      <Textarea
                        className="h-full min-h-[120px] resize-none text-lg bg-secondary border-none"
                        placeholder="Опишите проблему"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col justify-between gap-4">
                <FormField
                  control={form.control}
                  name="agreement"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ApproveCheckbox id="agreement" onChange={field.onChange}>
                          <span className="text-sm text-muted-foreground">
                            Я принимаю условия{' '}
                            <a className="underline hover:text-primary" href="#">
                              политики конфиденциальности
                            </a>
                          </span>
                        </ApproveCheckbox>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-[95px] text-2xl! font-semibold! rounded-2xl text-white"
                  disabled={!isFormValid}
                  variant="primary"
                >
                  Отправить
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
