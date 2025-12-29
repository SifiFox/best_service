import Image from 'next/image';

import { cn } from '@/lib/utils';

export default function Logo({
  className,
  width = 100,
  height = 100,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      alt="Logo"
      className={cn(className)}
      height={height}
      src="/icons/logo.svg"
      width={width}
    />
  );
}
