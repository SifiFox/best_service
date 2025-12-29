import { ReactNode } from 'react';

export default function UnderWorkProgress({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 items-center pointer-events-none bg-gray-200 rounded-full cursor-not-allowed px-2">
      {children}
      <div className="text-primary text-base leading-7 flex items-center">⚠️</div>
    </div>
  );
}
