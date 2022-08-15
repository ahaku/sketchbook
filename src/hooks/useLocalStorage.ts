import { useEffect, useRef, useState } from "react";

const useLocalStorage = <V>(
  key: string,
  defaultValue?: V,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [V, (value: V) => void] => {
  const [state, setState] = useState<V>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

export default useLocalStorage;
