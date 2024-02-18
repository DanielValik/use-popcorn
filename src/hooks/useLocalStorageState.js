import { useEffect, useState } from "react";

export function useLocalStorageState(initialValue, localStorageKey) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(localStorageKey);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    },
    [localStorageKey, value]
  );

  return [value, setValue];
}
