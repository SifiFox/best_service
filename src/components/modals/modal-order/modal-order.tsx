import { cn, formatRelativeTime } from '@/lib/utils';

import { Order } from '@/components/profile/tabs-content/orders';
import { TITLE_BY_STATUS } from '@/components/profile/ui/order-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function OrderField({
  label,
  value,
  className = 'flex gap-8',
}: {
  label: string;
  value: string | number | undefined | null;
  className?: string;
}) {
  if (!value) return null;

  return (
    <div className={className}>
      <p className="w-[40%] text-base font-semibold">{label}:</p>
      <p className="w-full text-base">{value}</p>
    </div>
  );
}

type ModalOrderState = {
  isOpen: boolean;
  order: Order | null;
};

const PAYMENT_METHOD_BY_STATUS = {
  cash: 'Наличными',
  online: 'Онлайн',
};

export default function ModalOrder({
  modalState,
  onClose,
}: {
  modalState: ModalOrderState;
  onClose: () => void;
}) {
  return (
    <Dialog onOpenChange={onClose} open={modalState.isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="mt-4 flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <p>№{modalState.order?.number}</p>
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1',
                    modalState.order?.status === 'ontheway' && 'bg-primary/20 text-primary',
                    modalState.order?.status === 'delivered' && 'bg-green-100 text-green-500',
                    modalState.order?.status === 'rejected' && 'bg-primary/20 text-primary'
                  )}
                >
                  <p className="text-base font-semibold">
                    {TITLE_BY_STATUS[modalState.order?.status as keyof typeof TITLE_BY_STATUS]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-500">
                  {formatRelativeTime(modalState.order?.createdAt || '')}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {modalState.order?.services && modalState.order.services.length > 0 && (
            <ul className="flex flex-col gap-4">
              {modalState.order.services.map((service, index) => (
                <li className="flex justify-between gap-2" key={service.id}>
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold text-gray-400">{index + 1}.</span>
                    <p className="text-base">
                      {service.name} ({service.quantity})
                    </p>
                  </div>
                  <p className="text-base font-semibold whitespace-nowrap">
                    {Number(service.price) * service.quantity} ₽
                  </p>
                </li>
              ))}
            </ul>
          )}

          {modalState.order?.totalPrice && (
            <div className="border-border mb-4 flex justify-between gap-2 border-b pb-4">
              <p className="text-xl font-semibold">Общая стоимость работ:</p>
              <p className="text-xl font-semibold">{modalState.order?.totalPrice} ₽</p>
            </div>
          )}

          <OrderField label="Адрес и время" value={modalState.order?.address} />

          <OrderField label="Комментарий" value={modalState.order?.comment} />

          <OrderField
            label="Метод оплаты"
            value={
              modalState.order?.paymentMethod
                ? PAYMENT_METHOD_BY_STATUS[
                    modalState.order.paymentMethod as keyof typeof PAYMENT_METHOD_BY_STATUS
                  ]
                : null
            }
          />

          <OrderField label="Мастер" value={modalState.order?.master?.name} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
