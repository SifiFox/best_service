'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { oswaldStyle } from '@/lib/utils';
import { type CheckoutFormData } from '@/lib/validations/checkout';

import CheckoutSummary from '@/components/checkout/checkout-summary';
import FormCheckout from '@/components/forms/form-checkout/form-checkout';
import { Button } from '@/components/ui/button';

import { useCartStore } from '@/stores/cart-store';

import { useCreateOrder } from '@/entities/order/hooks/use-order';
import { useCurrentUser } from '@/entities/user/hooks/use-user';
import { OrderServiceCreate } from '@/shared/types/api';

export default function CheckoutComponent() {
  const createOrder = useCreateOrder();
  const { items, clearCart: _clearCart } = useCartStore();
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const router = useRouter();
  const handleFormChange = useCallback((data: CheckoutFormData, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid);
    setPaymentMethod(data.paymentMethod);
  }, []);

  const handleDeliveryPriceChange = useCallback((price: number) => {
    setDeliveryPrice(price);
  }, []);

  const handlePaymentAction = useCallback(async () => {
    if (!formData || !isFormValid) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (items.length === 0) {
      toast.error('Корзина пуста');
      return;
    }

    try {
      let address;
      if (formData.deliveryType === 'delivery' && formData.address) {
        address = {
          city: formData.address.city || 'Екатеринбург',
          street: formData.address.street || '',
          house: formData.address.house || '',
          apartment: formData.address.apartment || '',
        };
      } else {
        const addressParts = formData.deliveryAddress?.split(', ') || [];
        address = {
          city: addressParts[addressParts.length - 1] || 'Екатеринбург',
          street: addressParts[0] || '',
          house: addressParts[1] || '',
          apartment: '',
        };
      }

      const paymentTypeId = formData.paymentMethod === 'online' ? 1 : 2;

      const orderData = {
        address,
        client_id: 0,
        payment_type_id: paymentTypeId,
        cart: items.map(item => ({
          service_id: item.id,
          quantity: item.quantity,
        })),
        ...(formData.notes && { description: formData.notes }),
        ...(formData.phone && { phone: parseInt(formData.phone.replace(/\D/g, '')) }),
        ...(formData.email && { email: formData.email }),
        ...(formData.fullName && { client_name: formData.fullName }),
      };

      await createOrder.mutateAsync(orderData as OrderServiceCreate);

      toast.success(
        formData.paymentMethod === 'online'
          ? 'Заказ создан! Переходим к оплате...'
          : 'Заказ успешно оформлен!'
      );

      // clearCart();
      router.push(user ? '/profile' : '/');
    } catch {
      toast.error('Ошибка при создании заказа. Попробуйте еще раз.');
    }
  }, [formData, isFormValid, items, createOrder, user, router]);

  return (
    <div className="mb-6 flex flex-col justify-between gap-4 px-4 py-4 lg:mb-10 lg:flex-row lg:gap-8 lg:px-12">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full justify-between gap-3 sm:mb-6 sm:gap-4 lg:mb-8">
          <h1
            className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl"
            style={oswaldStyle}
          >
            Оформление заказа
          </h1>
        </div>

        <FormCheckout
          isLoadingUser={isLoadingUser}
          onDeliveryPriceChange={handleDeliveryPriceChange}
          onFormChange={handleFormChange}
          user={user || null}
        />

        <div className="mt-6 flex justify-start">
          <Link href="/cart">
            <Button size="lg" variant="outline">
              ← Вернуться в корзину
            </Button>
          </Link>
        </div>
      </div>

      <aside className="sticky top-4 mt-4 flex h-fit w-full flex-col gap-4 lg:top-[150px] lg:mt-33 lg:max-w-[400px]">
        <CheckoutSummary
          deliveryMethod={formData?.deliveryType || 'pickup'}
          deliveryPrice={deliveryPrice}
          isFormValid={isFormValid}
          isLoading={createOrder.isPending}
          onPaymentAction={handlePaymentAction}
          paymentMethod={paymentMethod}
        />
      </aside>
    </div>
  );
}
