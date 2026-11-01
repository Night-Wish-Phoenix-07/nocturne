import { useState, useCallback } from 'react';

// Temporary storage in the browser. Milestones 3-4 replace this with Firestore.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  const set = useCallback((next) => {
    setValue((prev) => {
      const val = typeof next === 'function' ? next(prev) : next;
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* storage full or blocked */ }
      return val;
    });
  }, [key]);
  return [value, set];
}
