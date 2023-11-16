import { useState, useEffect } from "react";

export const useDebaunce = (value, ms) => {
  const [debaunceValue, setDebaunceValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebaunceValue(value);
    }, ms);
    return () => {
      clearTimeout(handler);
    }
  }, [value, ms]);
  return debaunceValue;
}
