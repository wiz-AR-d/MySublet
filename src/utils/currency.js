// Currency utilities - EUR only
// Updated to only support Euro currency

export const currencyRates = {
  EUR: 1,
};

export const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

// Since we only support EUR, conversion is straightforward
export function convertPrice(price, fromCurrency = 'EUR', toCurrency = 'EUR') {
  if (!price) return 0;
  
  // Always return price as-is since we only support EUR
  return parseFloat(price);
}

export function getCurrencySymbol(currency = 'EUR') {
  return '€';
}

export function formatPrice(price, currency = 'EUR') {
  if (!price) return '€0';
  
  const numPrice = parseFloat(price);
  return `€${numPrice.toLocaleString('nl-NL', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`;
}

// Helper to format price with per month suffix
export function formatMonthlyPrice(price) {
  return `${formatPrice(price)}/month`;
}