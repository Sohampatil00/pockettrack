const STORAGE_KEY = 'pockettrack.transactions';

import type { Transaction } from '../types';

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Transaction[];
  } catch {
    console.warn('[PocketTrack] Failed to load transactions from localStorage');
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (err) {
    console.error('[PocketTrack] Failed to save transactions:', err);
    throw new Error('Could not save data. Storage may be full.');
  }
}
