import { useEffect, useState } from "react";

const INITIAL_DELAY = 500;

export const useDebounce = (value: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || INITIAL_DELAY
    );

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
