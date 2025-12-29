import { MouseEvent } from 'react';

import { Button } from './button';

type QuantityControlProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  className?: string;
};

export function QuantityControl({
  quantity,
  onQuantityChange,
  className = '',
}: QuantityControlProps) {
  const handleDecrease = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        className="w-8 h-8 p-0"
        disabled={quantity <= 1}
        onClick={handleDecrease}
        size="sm"
        variant="outline"
      >
        -
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button className="w-8 h-8 p-0" onClick={handleIncrease} size="sm" variant="outline">
        +
      </Button>
    </div>
  );
}
