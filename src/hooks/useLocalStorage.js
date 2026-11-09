import { useEffect, useState } from "react";

/**
 * Keeps React state in sync with a localStorage key.
 * React state is the source of truth during the session; an effect persists it.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The UI still works if browser storage is disabled or full.
    }
  }, [key, value]);

  return [value, setValue];
}
