'use client';

import { Heading } from '@radix-ui/themes';
import { type SVGProps, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type ResponsiveSize =
  | number
  | {
      base: number;
      sm?: number;
      md?: number;
      lg?: number;
    };

type ResponsiveTitleSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | {
      base: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
      sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
      md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
      lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
    };

export default function StarRating({
  label,
  onChange,
  defaultRating = 5,
  disabled = true,
  size = 24,
  titleSize = '8',
  className,
}: {
  label?: string;
  onChange?: (value: number) => void;
  defaultRating?: number;
  disabled?: boolean;
  size?: ResponsiveSize;
  titleSize?: ResponsiveTitleSize;
  className?: string;
}) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [currentSize, setCurrentSize] = useState<number>(
    typeof size === 'number' ? size : size.base
  );
  const [currentTitleSize, setCurrentTitleSize] = useState<string>(
    typeof titleSize === 'string' ? titleSize : titleSize.base
  );

  useEffect(() => {
    function handleResize() {
      if (typeof size === 'object') {
        const width = window.innerWidth;
        let newSize = size.base;

        if (width >= 1024 && size.lg) {
          newSize = size.lg;
        } else if (width >= 768 && size.md) {
          newSize = size.md;
        } else if (width >= 640 && size.sm) {
          newSize = size.sm;
        }

        setCurrentSize(newSize);
      }

      if (typeof titleSize === 'object') {
        const width = window.innerWidth;
        let newTitleSize = titleSize.base;

        if (width >= 1024 && titleSize.lg) {
          newTitleSize = titleSize.lg;
        } else if (width >= 768 && titleSize.md) {
          newTitleSize = titleSize.md;
        } else if (width >= 640 && titleSize.sm) {
          newTitleSize = titleSize.sm;
        }

        setCurrentTitleSize(newTitleSize);
      }
    }

    // Инициализация размеров
    handleResize();

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size, titleSize]);

  const handleRatingChange = (value: string) => {
    if (disabled) return;

    const newRating = parseInt(value, 10);
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (star: number) => {
    if (disabled) return;
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(0);
  };

  return (
    <div className={cn('flex items-center gap-2 overflow-y-hidden', className)}>
      {label && <Label htmlFor="rating">{label}</Label>}
      <RadioGroup
        aria-label="Rating"
        className={`flex items-center gap-2 ${disabled ? 'pointer-events-none cursor-not-allowed' : ''}`}
        disabled={disabled}
        id="rating"
        onValueChange={handleRatingChange}
        value={rating.toString()}
      >
        {[1, 2, 3, 4, 5].map(star => (
          <div key={star}>
            <RadioGroupItem
              className="peer sr-only"
              disabled={disabled}
              id={`rating-${star}`}
              value={star.toString()}
            />
            <Label
              className={disabled ? 'cursor-not-allowed opacity-100!' : 'cursor-pointer'}
              htmlFor={`rating-${star}`}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              title={`${star} star${star === 1 ? '' : 's'}`}
            >
              <StarIcon
                aria-disabled={disabled}
                className={`[&[aria-disabled=true]]:opacity-100 ${
                  hoverRating !== 0
                    ? hoverRating >= star
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted-foreground'
                    : rating >= star
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted-foreground'
                }`}
                height={currentSize}
                width={currentSize}
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
      {rating > 0 && (
        <Heading
          className="text-primary"
          size={currentTitleSize as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}
        >
          {rating},0
        </Heading>
      )}
    </div>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  const { height, width, ...rest } = props;
  return (
    <svg
      {...rest}
      height={height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
