import { useCurrency } from '@/context/CurrencyContext';
import { currencyService, type CurrencyCode } from '@/services/currencyService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const currencies = currencyService.getAllCurrencies();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-sm font-medium text-muted-foreground">
        Currency:
      </label>
      <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
        <SelectTrigger id="currency-select" className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              <span>{curr.symbol}</span>
              <span className="ml-2">{curr.code}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
