// Date, currency formatters
import { format } from 'date-fns';

export const formatters = {
  formatDate: (date) => format(new Date(date), 'MMM dd, yyyy'),
  formatCurrency: (amount) => `$${amount.toFixed(2)}`,
  formatDateTime: (date) => format(new Date(date), 'MMM dd, yyyy HH:mm'),
};

