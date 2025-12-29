'use client';

import PaymentTBank from '@/components/payments/payment-t-bank';
// client page: robots noindex is set via a separate route segment config

export default function PaymentPage() {
  return (
    <div className="my-30 flex min-w-full items-center justify-center rounded-lg p-8 shadow-xl md:min-w-[500px]">
      <PaymentTBank />
    </div>
  );
}
