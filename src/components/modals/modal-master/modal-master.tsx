'use client';

import FormMaster from '@/components/forms/form-master/form-master';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ModalMasterState = {
  isOpen: boolean;
};

export default function ModalMaster({
  modalState,
  onClose,
  title = 'Вызвать мастера',
}: {
  modalState: ModalMasterState;
  onClose: () => void;
  title?: string;
}) {
  return (
    <Dialog onOpenChange={onClose} open={modalState.isOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </DialogHeader>

        <FormMaster onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
