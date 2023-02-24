type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
