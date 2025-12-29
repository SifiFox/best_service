'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { parseAddress, parseNominatimAddress } from '@/lib/address-parser';
import { type CheckoutFormData, checkoutFormSchema } from '@/lib/validations/checkout';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MapPicker from '@/components/ui/map-picker';
import { PhoneInput } from '@/components/ui/phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

import { User } from '@/entities/user/types';

type FormCheckoutProps = {
  onFormChange: (data: CheckoutFormData, isValid: boolean) => void;
  onDeliveryPriceChange: (price: number) => void;
  user: User | null;
  isLoadingUser: boolean;
};

function getFullName(firstName: string | null, lastName: string | null): string {
  if (!firstName && !lastName) return '';
  return `${firstName || ''} ${lastName || ''}`.trim();
}

function formatPhoneToString(phone: number | null): string {
  if (!phone) return '';
  return phone.toString();
}

export default function FormCheckout({
  onFormChange,
  onDeliveryPriceChange,
  user,
  isLoadingUser,
}: FormCheckoutProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      deliveryType: 'pickup',
      deliveryAddress: 'ул. Ленина, 15, Екатеринбург',
      address: {
        city: '',
        street: '',
        house: '',
        apartment: '',
      },
      notes: '',
      paymentMethod: 'cash',
    },
    mode: 'onChange',
  });

  const {
    watch,
    setValue,
    formState: { isValid },
  } = form;
  const watchedValues = watch();

  useEffect(() => {
    if (user && !isLoadingUser) {
      const fullName = getFullName(user.first_name, user.last_name);
      const phone = formatPhoneToString(user.phone);

      setValue('fullName', fullName, { shouldValidate: true });
      setValue('phone', phone, { shouldValidate: true });
      setValue('email', user.email || '', { shouldValidate: true });
    }
  }, [user, isLoadingUser, setValue]);

  useEffect(() => {
    const deliveryPrice = watchedValues.deliveryType === 'delivery' ? 0 : 0;
    onDeliveryPriceChange(deliveryPrice);
  }, [watchedValues.deliveryType, onDeliveryPriceChange]);

  useEffect(() => {
    onFormChange(watchedValues, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchedValues.fullName,
    watchedValues.phone,
    watchedValues.email,
    watchedValues.deliveryType,
    watchedValues.deliveryAddress,
    watchedValues.address,
    watchedValues.notes,
    watchedValues.paymentMethod,
    isValid,
    onFormChange,
  ]);

  const handleAddressSelect = (
    address: string,
    _lat: number,
    _lng: number,
    nominatimData?: {
      address?: {
        city?: string;
        town?: string;
        village?: string;
        hamlet?: string;
        road?: string;
        house_number?: string;
      };
      display_name?: string;
    } | null
  ) => {
    const parsedAddress = nominatimData
      ? parseNominatimAddress(nominatimData)
      : parseAddress(address);

    setValue('address.city', parsedAddress.city, { shouldValidate: true });
    setValue('address.street', parsedAddress.street, { shouldValidate: true });
    setValue('address.house', parsedAddress.house, { shouldValidate: true });

    setIsMapOpen(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="mb-0 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Контактные данные</h2>
          {isLoadingUser && (
            <div className="mb-4 flex items-center justify-center py-4">
              <div className="text-center">
                <div className="border-primary mx-auto h-6 w-6 animate-spin rounded-full border-b-2" />
                <p className="text-muted-foreground mt-2 text-sm">Загрузка данных...</p>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem id="checkout-fullname">
                  <FormLabel>ФИО *</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ваше полное имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem id="checkout-phone">
                    <FormLabel>Номер телефона *</FormLabel>
                    <FormControl>
                      <PhoneInput
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem id="checkout-email">
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.ru" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mb-0 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Выберите способ обращения</h2>

          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem id="checkout-delivery-type">
                <FormControl>
                  <RadioGroup
                    className="flex gap-4 space-y-4"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="mb-0 flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem id="pickup" value="pickup" />
                      <label className="flex-1 cursor-pointer" htmlFor="pickup">
                        <div className="font-medium">В сервисном центре</div>
                        <div className="text-sm text-gray-500">Бесплатно</div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem id="delivery" value="delivery" />
                      <label className="flex-1 cursor-pointer" htmlFor="delivery">
                        <div className="font-medium">Вызов на дом</div>
                        <div className="text-sm text-gray-500">0 ₽</div>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchedValues.deliveryType === 'pickup' ? (
            <div className="mt-4">
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem id="checkout-delivery-address">
                    <FormLabel>Адрес сервисного центра</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-medium">Адрес вызова мастера</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem id="checkout-address-city">
                      <FormLabel>Город *</FormLabel>
                      <FormControl>
                        <Input placeholder="Екатеринбург" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem id="checkout-address-street">
                      <FormLabel>Улица *</FormLabel>
                      <FormControl>
                        <Input placeholder="ул. Ленина" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address.house"
                  render={({ field }) => (
                    <FormItem id="checkout-address-house">
                      <FormLabel>Дом *</FormLabel>
                      <FormControl>
                        <Input placeholder="15" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.apartment"
                  render={({ field }) => (
                    <FormItem id="checkout-address-apartment">
                      <FormLabel>Квартира</FormLabel>
                      <FormControl>
                        <Input placeholder="12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Dialog onOpenChange={setIsMapOpen} open={isMapOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">
                      📍 Выбрать на карте
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Выберите адрес на карте</DialogTitle>
                    </DialogHeader>
                    <MapPicker
                      onAddressSelect={handleAddressSelect}
                      onClose={() => setIsMapOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>

        <div className="mb-0 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Примечания к заказу</h2>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem id="checkout-notes">
                <FormControl>
                  <Textarea
                    className="min-h-20"
                    placeholder="Дополнительные пожелания или уточнения..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-0 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Выберите способ оплаты</h2>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem id="checkout-payment-method">
                <FormControl>
                  <RadioGroup
                    className="flex gap-4 space-y-3"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="mb-0 flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem id="online" value="online" />
                      <label className="flex-1 cursor-pointer" htmlFor="online">
                        <div className="font-medium">Онлайн оплата</div>
                        <div className="text-sm text-gray-500">Банковской картой</div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg border p-3">
                      <RadioGroupItem id="cash" value="cash" />
                      <label className="flex-1 cursor-pointer" htmlFor="cash">
                        <div className="font-medium">При получении</div>
                        <div className="text-sm text-gray-500">Наличными или картой</div>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex gap-4">
            <div className="relative flex h-[32px] w-[50px] items-center justify-center">
              <Image alt="stripe" className="h-full w-full" fill src="/icons/payments/stripe.svg" />
            </div>
            <div className="relative flex h-[32px] w-[50px] items-center justify-center">
              <Image alt="GPay" className="h-full w-full" fill src="/icons/payments/maestro.svg" />
            </div>
            <div className="relative flex h-[32px] w-[50px] items-center justify-center">
              <Image
                alt="GPay"
                className="h-full w-full"
                fill
                src="/icons/payments/mastercard.svg"
              />
            </div>
            <div className="relative flex h-[32px] w-[50px] items-center justify-center">
              <Image alt="GPay" className="h-full w-full" fill src="/icons/payments/paypal.svg" />
            </div>
            <div className="relative flex h-[32px] w-[50px] items-center justify-center">
              <Image alt="GPay" className="h-full w-full" fill src="/icons/payments/gpay.svg" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
