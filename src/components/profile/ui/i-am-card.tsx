import { ReactNode } from 'react';

export default function IAmCard({
  header,
  body,
  icon,
  onClick,
}: {
  header: ReactNode;
  body: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="min-h-[180px] cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all hover:border-gray-300 hover:shadow-lg lg:p-8"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {header}
          {icon && <div className="text-[#1F5400]">{icon}</div>}
        </div>
        <div className="text-gray-600">{body}</div>
      </div>
    </div>
  );
}
