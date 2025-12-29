import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { loginPhoneSchema } from '@/lib/validations/login-phone';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

const formSchema = loginPhoneSchema;

export default function FormSendCode({
  phoneForm,
  onSubmitPhone,
}: {
  phoneForm: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmitPhone: (data: z.infer<typeof formSchema>) => void;
}) {
  return (
    <Form {...phoneForm}>
      <form className="space-y-8" onSubmit={phoneForm.handleSubmit(onSubmitPhone)}>
        <div className="grid gap-4">
          <FormField
            control={phoneForm.control}
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
          <Button type="submit">Отправить код</Button>
        </div>
      </form>
    </Form>
  );
}
