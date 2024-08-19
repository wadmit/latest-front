import { useEffect, useState } from "react";

function useCurrencyInfo() {
  const [data, setData] = useState<{ [k: string]: number }>({});
  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json",
    )
      .then((res) => res.json())
      .then((res) => setData(res.cny));
  }, ["cny"]);

  return data;
}

export default useCurrencyInfo;
