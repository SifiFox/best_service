'use client';

import { ReactNode } from 'react';

import BirthdayForm from '@/components/forms/i-am/birthday-form';
import CityForm from '@/components/forms/i-am/city-form';
import PasswordForm from '@/components/forms/i-am/password-form';
import PhoneForm from '@/components/forms/i-am/phone-form';
import SocialNetworksForm from '@/components/forms/i-am/social-networks-form';
import UserForm from '@/components/forms/i-am/user-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export type ProfileFieldType =
  | 'user'
  | 'city'
  | 'phone'
  | 'birthday'
  | 'social_networks'
  | 'password';

type ProfileModalState = {
  isOpen: boolean;
  fieldType: ProfileFieldType | null;
  icon?: ReactNode;
  title?: string;
};

type ProfileModalEditProps = {
  modalState: ProfileModalState;
  onClose: () => void;
};

export default function ProfileModalEdit({ modalState, onClose }: ProfileModalEditProps) {
  const renderForm = () => {
    switch (modalState.fieldType) {
      case 'user':
        return <UserForm onClose={onClose} />;
      case 'city':
        return <CityForm onClose={onClose} />;
      case 'phone':
        return <PhoneForm onClose={onClose} />;
      case 'birthday':
        return <BirthdayForm onClose={onClose} />;
      case 'social_networks':
        return <SocialNetworksForm onCloseAction={onClose} />;
      case 'password':
        return <PasswordForm onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={modalState.isOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {modalState.icon && <div className="text-primary">{modalState.icon}</div>}
            <span>Редактировать {modalState.title}</span>
          </DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}
