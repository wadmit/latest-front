import { useEffect, useState } from "react";
import axios from "axios";

const getCurrencyBasedOnBaseCurrency = async (baseCurrency: string) => {
  const response = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency.toLowerCase()}.json`
  );
  const data = await response.json();
  return data;
};

const useCostConverter = () => {
  const [to, setTo] = useState("usd"); // currency type
  const [cache, setCache] = useState(new Map<string, Record<string, number>>());
  const [error, setError] = useState(false);
  const [requestQueue, setRequestQueue] = useState<Map<string, Function[]>>(
    new Map()
  );

  const getLocation = async () => {
    try {
      const { data } = await axios.get("https://ipapi.co/json");
      setTo(data?.currency?.toLowerCase() || "usd");
    } catch (err) {
      // Log or handle error appropriately
      setTo("usd");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const processRequestQueue = async (baseCurr: string) => {
    const queue = requestQueue.get(baseCurr) || [];
    setRequestQueue(new Map(requestQueue.set(baseCurr, [])));

    for (const callback of queue) {
      await callback();
    }
  };

  const getConvertedCosts = async (val: number, baseCurr = "usd") => {
    try {
      if (!cache.has(baseCurr)) {
        if (requestQueue.has(baseCurr)) {
          // If a request for the same currency is already in progress, queue the current request
          return new Promise<string>((resolve) => {
            requestQueue
              .get(baseCurr)
              ?.push(() => resolve(getConvertedCosts(val, baseCurr)));
          });
        }

        setRequestQueue(new Map(requestQueue.set(baseCurr, [])));
        const data = await getCurrencyBasedOnBaseCurrency(baseCurr);
        setCache(new Map(cache.set(baseCurr, data[baseCurr])));
        await processRequestQueue(baseCurr);
      }
    } catch (error) {
      setError(true);
      await processRequestQueue(baseCurr); // Ensure the queue is processed even if there is an error
    }

    const currentTo = !error ? to : "usd";
    const conversionRate = cache.get(baseCurr)?.[currentTo] || 1;

    const formattedValue = (val * conversionRate)?.toLocaleString("en-US", {
      style: "currency",
      currency: currentTo,
      minimumFractionDigits: Number.isInteger(val) ? 0 : 2,
      maximumFractionDigits: 2,
    });

    return formattedValue || ""; // Ensure a valid string is always returned
  };

  return { getConvertedCosts, baseCurrency: to };
};

export default useCostConverter;
