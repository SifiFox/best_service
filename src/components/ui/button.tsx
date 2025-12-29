import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          'cursor-pointer text-white shadow-xs bg-gradient-primary shadow-primary/20 hover:shadow-primary/30',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border transparent shadow-xs hover:bg-white text-black hover:text-black dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        white:
          'cursor-pointer bg-white text-black shadow-xs hover:bg-gradient-primary hover:text-black',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        gray: 'bg-gray-300 text-gray-700 shadow-xs hover:bg-gray-200/80',
        transparent: '!bg-transparent !border-none !shadow-none',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-gradient-primary',
        dark: 'bg-black text-white shadow-xs hover:bg-gray-600/80',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3 text-sm md:text-base',
        sm: 'h-7 md:h-8 rounded-md gap-1 md:gap-1.5 px-2 md:px-3 text-xs md:text-sm has-[>svg]:px-2 md:has-[>svg]:px-2.5',
        lg: 'h-9 md:h-10 rounded-md px-4 md:px-6 text-base md:text-lg has-[>svg]:px-3 md:has-[>svg]:px-4',
        xl: 'h-10 md:h-12 rounded-md px-6 md:px-8 text-lg md:text-xl has-[>svg]:px-4 md:has-[>svg]:px-6',
        icon: 'size-8 md:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  );
}

export { Button, buttonVariants };
