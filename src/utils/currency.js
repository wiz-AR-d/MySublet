// Currency conversion rates and utilities
// This is static data, not database-dependent

export const currencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CAD: 1.25,
  AUD: 1.45
};

export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

export function convertPrice(price, fromCurrency, toCurrency) {
  if (!price || !fromCurrency || !toCurrency) return price;
  
  const fromRate = currencyRates[fromCurrency] || 1;
  const toRate = currencyRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const priceInUSD = price / fromRate;
  const convertedPrice = priceInUSD * toRate;
  
  return Math.round(convertedPrice * 100) / 100; // Round to 2 decimal places
}

export function getCurrencySymbol(currency) {
  const currencyObj = currencies.find(c => c.code === currency);
  return currencyObj?.symbol || '$';
}

