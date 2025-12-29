import { useRouter } from 'next/navigation';

import { useCartStore } from '@/stores/cart-store';

export function useCheckoutAccess() {
  const router = useRouter();
  const { items } = useCartStore();

  const grantCheckoutAccess = () => {
    // Проверяем, есть ли товары в корзине
    if (items.length === 0) {
      return false;
    }

    // Устанавливаем cookie для доступа к checkout
    document.cookie = 'checkout-access=true; path=/; max-age=300'; // 5 минут
    return true;
  };

  const navigateToCheckout = () => {
    if (grantCheckoutAccess()) {
      router.push('/checkout');
    }
  };

  return {
    navigateToCheckout,
    hasItems: items.length > 0,
  };
}
