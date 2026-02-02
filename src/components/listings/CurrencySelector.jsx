import { useState, useRef, useEffect } from 'react';
import { useListingStore } from '../../store/listingStore';
import { currencies } from '../../data/mockListings';
import { ChevronDown } from 'lucide-react';

export default function CurrencySelector() {
  const { selectedCurrency, setCurrency } = useListingStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const currentCurrency = currencies.find(c => c.code === selectedCurrency);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        data-testid="currency-selector"
      >
        <span className="font-medium">{currentCurrency?.symbol}</span>
        <span className="text-sm text-gray-600">{currentCurrency?.code}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setCurrency(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                  selectedCurrency === currency.code
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-gray-700'
                }`}
                data-testid={`currency-${currency.code.toLowerCase()}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{currency.symbol}</span>
                    <span className="text-sm">{currency.code}</span>
                  </div>
                  <span className="text-xs text-gray-500">{currency.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}