'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PaymentFunction = (formElement: HTMLFormElement) => void;

type TBankPaymentFormValue<Type> = {
  value: Type;
};

type TBankPaymentFormValues = {
  terminalkey: TBankPaymentFormValue<number>;
  frame: TBankPaymentFormValue<boolean>;
  language: TBankPaymentFormValue<string>;
  description: TBankPaymentFormValue<string>;
  amount: TBankPaymentFormValue<number>;
  order: TBankPaymentFormValue<number>;
  name: TBankPaymentFormValue<string>;
  email: TBankPaymentFormValue<string>;
  phone: TBankPaymentFormValue<string>;
  receipt: TBankPaymentFormValue<string>;
};

export default function PatmentTbankForm(props: {
  amount?: number;
  description?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  onSubmit?: () => void;
}) {
  const { amount, description, email, phone, fullName, onSubmit } = props;
  useEffect(() => {
    const TPF = document.getElementById('payform-tbank');

    TPF?.addEventListener('submit', e => {
      e.preventDefault();

      if (!TPF) return;

      const formElement = TPF as HTMLFormElement & TBankPaymentFormValues;
      const description = formElement.elements.namedItem('description') as HTMLInputElement;
      const amount = formElement.elements.namedItem('amount') as HTMLInputElement;
      const email = formElement.elements.namedItem('email') as HTMLInputElement;
      const phone = formElement.elements.namedItem('phone') as HTMLInputElement;
      const receipt = formElement.elements.namedItem('receipt') as HTMLInputElement;

      if (receipt) {
        if (!email.value && !phone.value) {
          alert('Поле E-mail или Phone не должно быть пустым');
          return;
        }

        receipt.value = JSON.stringify({
          EmailCompany: 'pipsmster135@gmail.com',
          Taxation: 'usn_income',
          FfdVersion: '1.2',
          Items: [
            {
              Name: description.value || 'Оплата',
              Price: Math.round(Number(amount.value) * 100),
              Quantity: 1.0,
              Amount: Math.round(Number(amount.value) * 100),
              PaymentMethod: 'full_payment',
              PaymentObject: 'service',
              Tax: 'none',
              MeasurementUnit: 'шт',
            },
          ],
        });
      }

      if (typeof (window as Window & { pay?: PaymentFunction }).pay === 'function') {
        (window as Window & { pay?: PaymentFunction }).pay!(formElement);
      } else {
        alert('Ошибка инициализации платежной системы. Пожалуйста, перезагрузите страницу.');
      }
    });
  }, []);

  return (
    <form className="w-full space-y-4" id="payform-tbank" name="payform-tbank">
      <input name="terminalkey" type="hidden" value="1706713136018" />
      <input name="frame" type="hidden" value="true" />
      <input name="language" type="hidden" value="ru" />
      <input name="receipt" type="hidden" value="" />
      <input name="order" type="hidden" />
      <input defaultValue={phone || ''} name="phone" type="hidden" />

      <div className="space-y-2">
        <Label htmlFor="amount">Сумма заказа</Label>
        <Input
          defaultValue={amount?.toString() || ''}
          id="amount"
          name="amount"
          placeholder="Введите сумму"
          required
          type="number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание заказа</Label>
        <Input
          defaultValue={description || 'Оплата заказа'}
          id="description"
          name="description"
          placeholder="Описание заказа"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">ФИО плательщика</Label>
        <Input
          defaultValue={fullName || ''}
          id="name"
          name="name"
          placeholder="Введите ФИО"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          defaultValue={email || ''}
          id="email"
          name="email"
          placeholder="example@email.com"
          type="email"
        />
      </div>

      <Button className="w-full" onClick={onSubmit} type="submit">
        Оплатить
      </Button>
    </form>
  );
}
