import { useState } from 'react';

import ModalNotification from '@/components/modals/modal-notification/modal-notification';

import NotificationCard, { Notification } from '../ui/notification-card';

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Лучший сервис',
    description:
      'Значимость этих проблем настолько очевидна, что синтетическое тестирование играет важную роль в формировании кластеризации усилий. Есть над чем задуматься: сторонники тоталитаризма в науке призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Как уже неоднократно упомянуто, реплицированные с зарубежных источников, современные исследования.',
    createdAt: '2025-06-28',
    isRead: false,
  },
  {
    id: 2,
    title: 'Лучший сервис',
    description:
      'Значимость этих проблем настолько очевидна, что синтетическое тестирование играет важную роль в формировании кластеризации усилий. Есть над чем задуматься: сторонники тоталитаризма в науке призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Как уже неоднократно упомянуто, реплицированные с зарубежных источников, современные исследования.',
    createdAt: '2025-06-28',
    isRead: true,
  },
  {
    id: 3,
    title: 'Лучший сервис',
    description:
      'Значимость этих проблем настолько очевидна, что синтетическое тестирование играет важную роль в формировании кластеризации усилий. Есть над чем задуматься: сторонники тоталитаризма в науке призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Как уже неоднократно упомянуто, реплицированные с зарубежных источников, современные исследования.',
    createdAt: '2025-06-28',
    isRead: false,
  },
];

export default function Notifications() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    notification: null as Notification | null,
  });

  const onClose = () => {
    setModalState({
      isOpen: false,
      notification: null,
    });
  };
  return (
    <div className="mt-10 flex flex-col gap-4 px-0 lg:mt-15 lg:px-20 xl:px-30 2xl:px-50">
      {notifications.map(item => (
        <div className="flex cursor-pointer flex-col gap-4" key={item.id}>
          <NotificationCard
            notification={item}
            onClick={() =>
              setModalState({
                isOpen: true,
                notification: item,
              })
            }
          />
        </div>
      ))}

      <ModalNotification modalState={modalState} onClose={onClose} />
    </div>
  );
}
