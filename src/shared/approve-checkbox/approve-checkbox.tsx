import { ReactNode } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

export default function ApproveCheckbox({
  id,
  children,
  onChange,
}: {
  id: string;
  children: ReactNode;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox className="size-6" id={id} onCheckedChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
