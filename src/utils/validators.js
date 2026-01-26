// Form validators
export const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  required: (value) => value && value.trim().length > 0,
  minLength: (value, min) => value && value.length >= min,
  phone: (phone) => /^\+?[\d\s-()]+$/.test(phone),
};

