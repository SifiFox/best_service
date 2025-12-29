'use client';

import PatmentTbankForm from './payment-tbank-form';

export default function PaymentContent() {
  return (
    <div className="mx-auto my-10 w-xl space-y-6 rounded-lg border bg-white p-6 shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Оплата заказа</h1>
        <p className="mt-2 text-sm text-gray-600">Введите данные для оплаты</p>
      </div>

      <PatmentTbankForm />
    </div>
  );
}
