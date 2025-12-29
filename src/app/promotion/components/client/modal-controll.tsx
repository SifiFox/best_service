'use client';

import { ReactNode, useState } from 'react';

import ModalMaster from '@/components/modals/modal-master/modal-master';

export const ModalControll = ({ trigger, title }: { trigger: ReactNode; title: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <ModalMaster modalState={{ isOpen: open }} onClose={() => setOpen(false)} title={title} />
      )}
    </>
  );
};
