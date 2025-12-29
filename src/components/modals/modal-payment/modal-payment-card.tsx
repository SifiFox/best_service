'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { usePayment } from '@/entities/payment/hooks/use-payment';

import CardPaymentForm from './card-payment-form';

type ModalPaymentState = {
  isOpen: boolean;
  orderId: number;
  amount: number;
  orderNumber: string;
};

export default function ModalPaymentCard({
  modalState,
  onClose,
  onSuccess,
}: {
  modalState: ModalPaymentState;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { processOrderPayment } = usePayment();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>(
    'idle'
  );

  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    setTimeout(() => {
      onClose();
      onSuccess?.();
      setPaymentStatus('idle');
    }, 2000);
  };

  const handlePaymentError = () => {
    setPaymentStatus('error');
    setTimeout(() => {
      setPaymentStatus('idle');
    }, 3000);
  };

  return (
    <Dialog onOpenChange={onClose} open={modalState.isOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-semibold">Оплата заказа</h2>
              <p className="text-muted-foreground text-xl">Заказ №{modalState.orderNumber}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {paymentStatus === 'idle' && (
            <CardPaymentForm
              amount={modalState.amount}
              onPaymentError={handlePaymentError}
              onPaymentSuccess={handlePaymentSuccess}
              orderId={modalState.orderId}
              processOrderPayment={processOrderPayment}
            />
          )}

          {paymentStatus === 'processing' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2" />
              <p className="text-muted-foreground text-center">Обработка платежа...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="rounded-full bg-green-100 p-3">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-center font-semibold text-green-600">Платеж успешно обработан!</p>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="rounded-full bg-primary/20 p-3">
                <svg
                  className="h-8 w-8 text-[#3DA000]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-center font-semibold text-[#3DA000]">Ошибка обработки платежа</p>
              <p className="text-muted-foreground text-center text-sm">
                Попробуйте еще раз или обратитесь в поддержку
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
