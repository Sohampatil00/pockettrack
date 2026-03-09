import type { Category } from '../types';

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  'Salary': ['salary', 'pay', 'bonus', 'wage', 'stipend'],
  'Food & Dining': ['mcdonalds', 'swiggy', 'zomato', 'restaurant', 'cafe', 'coffee', 'groceries', 'mart', 'supermarket', 'food', 'lunch', 'dinner', 'breakfast'],
  'Transport': ['uber', 'ola', 'rapido', 'bus', 'train', 'flight', 'metro', 'petrol', 'fuel', 'cab', 'taxi', 'ticket'],
  'Shopping': ['amazon', 'flipkart', 'myntra', 'zara', 'h&m', 'clothes', 'shoes', 'electronics', 'shopping', 'store'],
  'Healthcare': ['hospital', 'clinic', 'pharmacy', 'medicines', 'apollo', 'doctor', 'med'],
  'Entertainment': ['movie', 'cinema', 'netflix', 'amazon prime', 'hotstar', 'spotify', 'concert', 'game', 'pvr', 'inox'],
  'Bills & Utilities': ['electricity', 'water', 'internet', 'wifi', 'broadband', 'jio', 'airtel', 'recharge', 'bill', 'rent', 'maintenance'],
  'Education': ['school', 'college', 'tuition', 'course', 'udemy', 'coursera', 'books', 'fee'],
  'Investment': ['stocks', 'mutual fund', 'zerodha', 'groww', 'crypto', 'fd', 'rd', 'sip'],
  'Other': []
};

export function guessCategoryFromDescription(desc: string): Category | null {
  const normalizedDesc = desc.toLowerCase().trim();
  
  if (!normalizedDesc) return null;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      // Check if the description includes the keyword
      // Using word boundaries \b would be safer, but simple includes is often enough for a prototype
      if (normalizedDesc.includes(keyword.toLowerCase())) {
        return category as Category;
      }
    }
  }

  return null;
}
