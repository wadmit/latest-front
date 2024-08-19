import { EBaseCurrency } from "@/types/university";
import { useEffect, useState } from "react";

function useCurrencyInfOthers(
  baseCurrency: EBaseCurrency,
): [currencyInfo: { [k: string]: number }, error: Error | null] {
  const [currencyInfo, setCurrencyInfo] = useState<{ [k: string]: number }>({});
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    console.log(error);
  }
  const cache = {};
  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json",
    )
      .then((res) => res.json())
      .then((res) => setCurrencyInfo(res))
      .catch((err) => setError(err));
  }, [baseCurrency]);

  return [currencyInfo, error];
}

export default useCurrencyInfOthers;
