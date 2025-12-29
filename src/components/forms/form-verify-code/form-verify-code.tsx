import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type SmsFormData = {
  phone: string;
  smsCode: string;
};

type FormVerifyCodeProps = {
  smsForm: UseFormReturn<SmsFormData>;
  onSubmitSms: (data: SmsFormData) => void;
  phoneNumber: string;
  handleBackToPhone: () => void;
};

export default function FormVerifyCode({
  smsForm,
  onSubmitSms,
  phoneNumber,
  handleBackToPhone,
}: FormVerifyCodeProps) {
  return (
    <Form {...smsForm}>
      <form className="space-y-8" onSubmit={smsForm.handleSubmit(onSubmitSms)}>
        <div className="grid gap-4">
          <div className="text-muted-foreground text-center text-sm">
            Код отправлен на номер: {phoneNumber}
          </div>
          <FormField
            control={smsForm.control}
            name="smsCode"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="smsCode">Код из СМС</FormLabel>
                <FormControl>
                  <InputOTP
                    className="w-full"
                    maxLength={4}
                    onChange={value => {
                      field.onChange(value);
                      if (value.length === 4) {
                        smsForm.handleSubmit(onSubmitSms)();
                      }
                    }}
                    value={field.value}
                  >
                    <InputOTPGroup className="w-full justify-between">
                      <InputOTPSlot className="flex-1" index={0} />
                      <InputOTPSlot className="flex-1" index={1} />
                      <InputOTPSlot className="flex-1" index={2} />
                      <InputOTPSlot className="flex-1" index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" onClick={handleBackToPhone} type="button" variant="outline">
            Изменить номер
          </Button>
          {smsForm.formState.isSubmitting && (
            <div className="text-muted-foreground text-center text-sm">Проверка кода...</div>
          )}
        </div>
      </form>
    </Form>
  );
}
