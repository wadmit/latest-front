import { useEffect, useState } from "react";

function useCurrencyApplication(): [
  currencyInfo: { [k: string]: number },
  error: Error | null,
] {
  const [currencyInfo, setCurrencyInfo] = useState<{ [k: string]: number }>({});
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    console.log(error);
  }
  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json",
    )
      .then((res) => res.json())
      .then((res) => setCurrencyInfo(res.cny))
      .catch((err) => setError(err));
  }, []);

  return [currencyInfo, error];
}

export default useCurrencyApplication;
