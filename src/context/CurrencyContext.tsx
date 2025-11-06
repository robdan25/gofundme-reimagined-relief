import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CurrencyCode } from '@/services/currencyService';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get user's locale to determine default currency
  const getDefaultCurrency = (): CurrencyCode => {
    // Check localStorage first
    const saved = localStorage.getItem('preferred-currency');
    if (saved && ['JMD', 'USD', 'CAD', 'GBP'].includes(saved)) {
      return saved as CurrencyCode;
    }

    // Try to detect based on browser language/locale
    const locale = navigator.language || navigator.languages?.[0] || 'en-US';

    if (locale.startsWith('ja')) return 'JMD'; // Jamaica
    if (locale.startsWith('en-GB')) return 'GBP'; // UK
    if (locale.startsWith('en-CA')) return 'CAD'; // Canada

    return 'USD'; // Default to USD
  };

  const [currency, setCurrencyState] = useState<CurrencyCode>(getDefaultCurrency());

  // Persist currency selection
  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
