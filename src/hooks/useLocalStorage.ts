import { useState, useEffect } from "react";

type StorageValue<T> = T | null;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [StorageValue<T>, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
