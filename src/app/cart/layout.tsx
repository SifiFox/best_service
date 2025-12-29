import React from 'react';

import { Providers } from '../providers';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
