import { useState, useEffect } from "react";

type DebouncedValue<T> = T | undefined;

/**
 * A custom hook to debounce a value. Returns a debounced version of the value
 * that will only update after a given delay has passed.
 *
 * @template T The type of the value being debounced.
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds before the debounced value updates.
 * @returns {DebouncedValue<T>} The debounced version of the value.
 */
function useDebounce<T>(value: T, delay: number): DebouncedValue<T> {
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
