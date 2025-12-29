'use client';

import type { UseMutationResult } from '@tanstack/react-query';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';

import { ProcessOrderPaymentRequest } from '@/entities/payment/types';

type CardPaymentFormProps = {
  amount: number;
  orderId: number;
  onPaymentSuccess: () => void;
  onPaymentError: () => void;
  processOrderPayment: UseMutationResult<unknown, unknown, ProcessOrderPaymentRequest, unknown>;
};

export default function CardPaymentForm({
  amount,
  orderId,
  onPaymentSuccess,
  onPaymentError,
  processOrderPayment,
}: CardPaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [, setFocusedField] = useState<string | null>(null);

  // Форматирование номера карты
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  // Валидация номера карты
  const validateCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  // Валидация CVV
  const validateCVV = (value: string) => {
    return value.length === 3 && /^\d+$/.test(value);
  };

  // Валидация даты
  const validateExpiry = (month: string, year: string) => {
    if (!month || !year) return false;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const expMonth = parseInt(month);
    const expYear = parseInt('20' + year); // Предполагаем 20xx год

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;

    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value.replace(/\D/g, ''));
    } else if (field === 'cardHolder') {
      formattedValue = value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
    } else if (field === 'expiryMonth' || field === 'expiryYear') {
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация
    if (!validateCardNumber(formData.cardNumber)) {
      toast.error('Неверный номер карты');
      return;
    }

    if (!validateCVV(formData.cvv)) {
      toast.error('Неверный CVV код');
      return;
    }

    if (!validateExpiry(formData.expiryMonth, formData.expiryYear)) {
      toast.error('Неверная дата истечения карты');
      return;
    }

    if (!formData.cardHolder.trim()) {
      toast.error('Введите имя владельца карты');
      return;
    }

    try {
      await processOrderPayment.mutateAsync({
        order_id: orderId,
        payment_method: 'card',
        amount: amount,
      });
      onPaymentSuccess();
    } catch {
      onPaymentError();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Банковская карта с полями ввода */}
      <div className="relative">
        <div className="relative h-64 w-full rounded-xl bg-gradient-to-br from-yellow-600 to-purple-700 p-6 text-white shadow-lg">
          {/* Номер карты */}
          <div className="mt-4">
            <label className="text-xs text-white/70">Номер карты</label>
            <input
              className="mt-1 w-full bg-transparent text-2xl font-mono tracking-wider text-white placeholder-white/50 outline-none"
              maxLength={19}
              onBlur={() => setFocusedField(null)}
              onChange={e => handleInputChange('cardNumber', e.target.value)}
              onFocus={() => setFocusedField('cardNumber')}
              placeholder="•••• •••• •••• ••••"
              type="text"
              value={formData.cardNumber}
            />
          </div>

          {/* Имя владельца и дата */}
          <div className="mt-6 flex justify-between">
            <div className="flex-1">
              <label className="text-xs text-white/70">Владелец карты</label>
              <input
                className="mt-1 w-full bg-transparent font-medium text-white placeholder-white/50 outline-none"
                onBlur={() => setFocusedField(null)}
                onChange={e => handleInputChange('cardHolder', e.target.value)}
                onFocus={() => setFocusedField('cardHolder')}
                placeholder="ИМЯ ФАМИЛИЯ"
                type="text"
                value={formData.cardHolder}
              />
            </div>
            <div className="ml-4 flex flex-col">
              <label className="text-xs text-white/70">Срок действия</label>
              <div className="mt-1 flex gap-1">
                <input
                  className="w-8 bg-transparent text-center font-medium text-white placeholder-white/50 outline-none"
                  maxLength={2}
                  onBlur={() => setFocusedField(null)}
                  onChange={e => handleInputChange('expiryMonth', e.target.value)}
                  onFocus={() => setFocusedField('expiryMonth')}
                  placeholder="ММ"
                  type="text"
                  value={formData.expiryMonth}
                />
                <span className="text-white">/</span>
                <input
                  className="w-8 bg-transparent text-center font-medium text-white placeholder-white/50 outline-none"
                  maxLength={2}
                  onBlur={() => setFocusedField(null)}
                  onChange={e => handleInputChange('expiryYear', e.target.value)}
                  onFocus={() => setFocusedField('expiryYear')}
                  placeholder="ГГ"
                  type="text"
                  value={formData.expiryYear}
                />
              </div>
            </div>
          </div>

          {/* CVV */}
          <div className="mt-4 flex justify-end">
            <div className="flex flex-col items-center">
              <label className="text-xs text-white/70">CVV</label>
              <input
                className="mt-1 w-12 bg-transparent text-center font-medium text-white placeholder-white/50 outline-none"
                maxLength={3}
                onBlur={() => setFocusedField(null)}
                onChange={e => handleInputChange('cvv', e.target.value)}
                onFocus={() => setFocusedField('cvv')}
                placeholder="•••"
                type="text"
                value={formData.cvv}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка оплаты */}
      <Button className="w-full" disabled={processOrderPayment.isPending} type="submit">
        {processOrderPayment.isPending ? 'Обработка...' : `Оплатить ${amount.toLocaleString()} ₽`}
      </Button>
    </form>
  );
}
