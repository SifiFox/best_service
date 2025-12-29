import { cn, formatRelativeTime, oswaldStyle } from '@/lib/utils';

export type Notification = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
};

export default function NotificationCard({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) {
  return (
    <div
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-b border-gray-200 p-4"
      onClick={onClick}
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {!notification.isRead && <div className="h-2 w-2 rounded-full bg-yellow-600" />}
            <h3
              className={cn('text-base font-semibold lg:text-xl', notification.isRead && 'ml-4')}
              style={oswaldStyle}
            >
              {notification.title}
            </h3>
          </div>
          <p className="line-clamp-3 max-w-full text-base text-gray-500 lg:max-w-[70%]">
            {notification.description}
          </p>
        </div>
        <div>
          <p className="text-base whitespace-nowrap text-gray-500">
            {formatRelativeTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
