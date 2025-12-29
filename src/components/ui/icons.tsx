import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
};

const MaskedIcon = ({ className, src }: IconProps & { src: string }) => (
  <div
    className={cn('bg-current', className)}
    style={{
      maskImage: `url(${src})`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: `url(${src})`,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    }}
  />
);

export const LinkArrow = ({ className }: IconProps) => (
  <MaskedIcon className={className} src="/icons/link_arrow.svg" />
);

export const Percent = ({ className }: IconProps) => (
  <MaskedIcon className={className} src="/icons/percent.svg" />
);
