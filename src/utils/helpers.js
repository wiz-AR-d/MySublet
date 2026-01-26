// Helper functions
export const helpers = {
  truncate: (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  },
  slugify: (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },
  generateId: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },
};

