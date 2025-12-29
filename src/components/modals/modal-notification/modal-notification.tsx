import { Notification } from '@/components/profile/ui/notification-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ModalNotificationState = {
  isOpen: boolean;
  notification: Notification | null;
};

type ModalNotificationProps = {
  modalState: ModalNotificationState;
  onClose: () => void;
};

export default function ModalNotification({ modalState, onClose }: ModalNotificationProps) {
  return (
    <Dialog onOpenChange={onClose} open={modalState.isOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <p>{modalState.notification?.title}</p>
          </DialogTitle>
        </DialogHeader>
        <div>
          <p>{modalState.notification?.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
