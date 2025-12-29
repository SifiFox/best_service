export const deliveryTypes = {
  pickup: 'В сервисном центре',
  delivery: 'Вызов на дом',
} as const;

export type DeliveryType = keyof typeof deliveryTypes;
