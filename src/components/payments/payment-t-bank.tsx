import Script from 'next/script';
import { useState } from 'react';

import PaymentTBankForm from '../payment/payment-tbank-form';

export default function PaymentTBank(props: {
  amount?: number;
  description?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  onSubmit?: () => void;
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { amount, description, email, phone, fullName, onSubmit } = props;
  return (
    <>
      <Script
        onReady={() => setScriptLoaded(true)}
        src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"
        strategy="afterInteractive"
      />
      {scriptLoaded ? (
        <PaymentTBankForm
          amount={amount}
          description={description}
          email={email}
          fullName={fullName}
          onSubmit={onSubmit}
          phone={phone}
        />
      ) : (
        <div className="flex min-h-[546px] items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2" />
            <p className="text-muted-foreground mt-4">Загрузка платежной системы...</p>
          </div>
        </div>
      )}
    </>
  );
}
