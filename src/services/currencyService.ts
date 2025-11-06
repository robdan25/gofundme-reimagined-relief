// Currency Service - Handles multi-currency formatting and conversion
// Supports: JMD (Jamaica Dollar), USD (US Dollar), CAD (Canadian Dollar), GBP (British Pound)

export type CurrencyCode = 'JMD' | 'USD' | 'CAD' | 'GBP';

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  locale: string;
}

// Currency information
const currencies: Record<CurrencyCode, CurrencyInfo> = {
  JMD: {
    code: 'JMD',
    name: 'Jamaica Dollar',
    symbol: 'J$',
    locale: 'en-JM',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    locale: 'en-US',
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    locale: 'en-CA',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    locale: 'en-GB',
  },
};

// Exchange rates relative to USD (1 USD = X local currency)
// These are approximate rates and should be updated periodically
const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  JMD: 155, // 1 USD ≈ 155 JMD (approximate)
  CAD: 1.35, // 1 USD ≈ 1.35 CAD (approximate)
  GBP: 0.79, // 1 USD ≈ 0.79 GBP (approximate)
};

class CurrencyService {
  /**
   * Get currency info by code
   */
  getCurrencyInfo(code: CurrencyCode): CurrencyInfo {
    return currencies[code] || currencies.USD;
  }

  /**
   * Get all available currencies
   */
  getAllCurrencies(): CurrencyInfo[] {
    return Object.values(currencies);
  }

  /**
   * Format amount in specified currency
   */
  formatCurrency(amount: number, currency: CurrencyCode = 'USD'): string {
    const info = this.getCurrencyInfo(currency);

    // For JMD, use no decimal places; for others use 2
    const fractionDigits = currency === 'JMD' ? 0 : 2;

    try {
      return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(amount);
    } catch {
      // Fallback if Intl fails
      return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })}`;
    }
  }

  /**
   * Convert amount from one currency to another
   * Assumes input amount is in USD
   */
  convertCurrency(amountInUSD: number, targetCurrency: CurrencyCode): number {
    const rate = exchangeRates[targetCurrency] || 1;
    return Math.round(amountInUSD * rate * 100) / 100;
  }

  /**
   * Format and convert amount from USD to target currency
   */
  formatAndConvert(amountInUSD: number, targetCurrency: CurrencyCode): string {
    const converted = this.convertCurrency(amountInUSD, targetCurrency);
    return this.formatCurrency(converted, targetCurrency);
  }

  /**
   * Get exchange rate between two currencies
   */
  getExchangeRate(fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    return (toRate / fromRate);
  }

  /**
   * Update exchange rates (in case real-time rates need to be fetched)
   */
  updateExchangeRates(rates: Partial<Record<CurrencyCode, number>>): void {
    Object.assign(exchangeRates, rates);
  }
}

export const currencyService = new CurrencyService();
