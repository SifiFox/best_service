'use client';

import { Calendar, Home, Phone, Shield, TwitterIcon, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import ProfileModalEdit, { ProfileFieldType } from '@/components/modals/modal-profile-edit';

import { useCities } from '@/entities/city';
import { useCurrentUser } from '@/entities/user/hooks/use-user';

import IAmCard from '../ui/i-am-card';

type ProfileModalState = {
  isOpen: boolean;
  fieldType: ProfileFieldType | null;
  icon?: React.ReactNode;
  title?: string | undefined;
};

function formatDate(dateString: string | null): string {
  if (!dateString) return 'Не указана';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  } catch {
    return 'Не указана';
  }
}

function formatPhone(phone: number | null): string {
  if (!phone) return 'Не указан';

  const phoneStr = phone.toString();
  if (phoneStr.length === 11 && phoneStr.startsWith('7')) {
    return `+7 (${phoneStr.slice(1, 4)}) ${phoneStr.slice(4, 7)}-${phoneStr.slice(7, 9)}-${phoneStr.slice(9)}`;
  }

  return `+${phoneStr}`;
}

function getFullName(firstName: string | null, lastName: string | null): string {
  if (!firstName && !lastName) return 'Не указано';
  return `${firstName || ''} ${lastName || ''}`.trim();
}

function parseSocialLinks(
  socialLinks: string[] | null
): Array<{ name: string; url: string; icon: string | null; firstLetter?: string }> {
  if (!socialLinks || socialLinks.length === 0) return [];

  return socialLinks.map(link => {
    const url = link.toLowerCase();

    if (url.includes('vk.com') || url.includes('vk.ru')) {
      return { name: 'VK', url: link, icon: '/icons/socials/vk.svg' };
    }
    if (url.includes('t.me') || url.includes('telegram.me')) {
      return { name: 'Telegram', url: link, icon: '/icons/socials/tg.svg' };
    }
    if (url.includes('ok.ru') || url.includes('odnoklassniki.ru')) {
      return { name: 'OK', url: link, icon: '/icons/socials/ok.svg' };
    }
    if (url.includes('instagram.com') || url.includes('instagram.ru')) {
      return { name: 'Instagram', url: link, icon: null, firstLetter: 'I' };
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return { name: 'YouTube', url: link, icon: null, firstLetter: 'Y' };
    }
    if (url.includes('facebook.com') || url.includes('fb.com')) {
      return { name: 'Facebook', url: link, icon: null, firstLetter: 'F' };
    }
    if (url.includes('twitter.com') || url.includes('x.com')) {
      return { name: 'Twitter', url: link, icon: null, firstLetter: 'T' };
    }

    try {
      const domain = new URL(link).hostname.replace('www.', '');
      const firstLetter = domain.charAt(0).toUpperCase();
      return { name: domain, url: link, icon: null, firstLetter };
    } catch {
      const firstLetter = link.charAt(0)?.toUpperCase() || 'U';
      return { name: 'Unknown', url: link, icon: null, firstLetter };
    }
  });
}

function getRandomColor(): string {
  const colors = [
    'bg-primary',
    'bg-blue-500',
    'bg-green-500',
    'bg-primary',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)] || 'bg-primary';
}

export default function IAm() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { data: cities } = useCities();

  const [modalState, setModalState] = useState<ProfileModalState>({
    isOpen: false,
    fieldType: null,
    icon: undefined,
    title: undefined,
  });

  const openModal = (fieldType: ProfileFieldType, icon: React.ReactNode, title: string) => {
    setModalState({
      isOpen: true,
      fieldType,
      icon,
      title: title || '',
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      fieldType: null,
      icon: undefined,
      title: undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2" />
          <p className="text-muted-foreground mt-2">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-destructive">Ошибка загрузки профиля</p>
          <p className="text-muted-foreground mt-1 text-sm">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground">Пользователь не найден</p>
        </div>
      </div>
    );
  }

  const socialLinks = parseSocialLinks(user.social_link || null);

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 lg:mt-15 lg:grid-cols-3 lg:px-20 xl:px-30 2xl:px-50">
      <IAmCard
        body={<span className="text-muted-foreground text-xl">{user.email || 'Не указан'}</span>}
        header={
          <div className="flex items-center gap-4">
            <div className="relative size-10 lg:size-16">
              <Image alt="person" className="rounded-full" fill src="/images/user-empty.png" />
            </div>
            <span className="text-2xl font-medium">
              {getFullName(user.first_name, user.last_name)}
            </span>
          </div>
        }
        icon={<User className="size-10" />}
        onClick={() => openModal('user', <User className="size-6" />, 'профиль')}
      />

      <IAmCard
        body={
          <span className="text-muted-foreground text-xl">
            {user.city_id
              ? `Город: ${cities?.find(city => city.id === user.city_id)?.name}`
              : 'Не указан'}
          </span>
        }
        header={
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">Город</span>
          </div>
        }
        icon={<Home className="size-10" />}
        onClick={() => openModal('city', <Home className="size-6" />, 'город')}
      />

      <IAmCard
        body={<span className="text-muted-foreground text-xl">{formatPhone(user.phone)}</span>}
        header={
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">Телефон</span>
          </div>
        }
        icon={<Phone className="size-10" />}
        onClick={() => openModal('phone', <Phone className="size-6" />, 'телефон')}
      />

      <IAmCard
        body={<span className="text-muted-foreground text-xl">{formatDate(user.birth_date)}</span>}
        header={
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">Дата рождения</span>
          </div>
        }
        icon={<Calendar className="size-10" />}
        onClick={() => openModal('birthday', <Calendar className="size-6" />, 'дату рождения')}
      />

      <IAmCard
        body={
          <div className="flex gap-4">
            {socialLinks.length > 0 ? (
              socialLinks.map((social, index) => (
                <a
                  className="text-muted-foreground text-xl transition-opacity hover:opacity-80"
                  href={social.url}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.icon ? (
                    <img alt={social.name} className="h-6 w-6" src={social.icon} />
                  ) : (
                    <div
                      className={`h-6 w-6 rounded-full ${getRandomColor()} flex items-center justify-center text-xs font-medium text-white`}
                    >
                      {social.firstLetter}
                    </div>
                  )}
                </a>
              ))
            ) : (
              <span className="text-muted-foreground text-xl">Не указаны</span>
            )}
          </div>
        }
        header={
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">Социальные сети</span>
          </div>
        }
        icon={<TwitterIcon className="size-10" />}
        onClick={() =>
          openModal('social_networks', <TwitterIcon className="size-6" />, 'социальные сети')
        }
      />

      <IAmCard
        body={
          <span className="text-muted-foreground text-xl">
            Создайте пароль и используйте его при следующем входе
          </span>
        }
        header={
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">Пароль</span>
          </div>
        }
        icon={<Shield className="size-10" />}
        onClick={() => openModal('password', <Shield className="size-6" />, 'пароль')}
      />

      <ProfileModalEdit modalState={modalState} onClose={closeModal} />
    </div>
  );
}
