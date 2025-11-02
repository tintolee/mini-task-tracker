import { useState, useEffect } from 'react';
import { debounce } from '../utils';

export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debouncedSetter = debounce(setDebouncedValue, delay);
    debouncedSetter(value);
  }, [value, delay]);

  return debouncedValue;
};