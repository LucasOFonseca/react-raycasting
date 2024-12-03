import { useEffect, useRef } from 'react';

export function useKeyboardListener(
  key: string,
  callback: (event: KeyboardEvent) => void
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handle(e: KeyboardEvent): void {
      if (e.key === key) {
        callbackRef.current(e);
      }
    }

    document.addEventListener('keydown', handle);

    return () => document.removeEventListener('keydown', handle);
  }, [key]);
}
