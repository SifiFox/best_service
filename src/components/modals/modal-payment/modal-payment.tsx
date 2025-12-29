import dynamic from 'next/dynamic';

const PaymentTBank = dynamic(() => import('@/components/payments/payment-t-bank'), {
  ssr: false,
  loading: () => null,
});

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ModalPaymentState = {
  isOpen: boolean;
  orderId: number;
  amount: number;
  orderNumber: string;
};

export default function ModalPayment({
  modalState,
  onClose,
  amount,
  email,
  fullName,
}: {
  modalState: ModalPaymentState;
  onClose: () => void;
  amount: number;
  email: string;
  fullName: string;
}) {
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
          <PaymentTBank
            amount={amount}
            email={email}
            fullName={fullName}
            onSubmit={() => onClose()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
