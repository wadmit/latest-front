import { useCallback } from "react";

import { useAppSelector } from "@/global-states/hooks/hooks";

const useCostConverterMain = () => {
  const currency = useAppSelector((state) => state.currency.currency);
  const to = useAppSelector((state) => state.currency.to);


  const getConvertedCost = useCallback(
    (value: number, base_currency: string) => {
      let formattedValue = "";
      // let currentCurrency =
      let currentAmount = 0;
      if (currency && to) {
        const conversionRate = currency[base_currency ?? "usd"][to];
        currentAmount = value * conversionRate;
        formattedValue = currentAmount?.toLocaleString("en-US", {
          style: "currency",
          currency: to,
          // minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
          minimumFractionDigits: 0,
          // maximumFractionDigits: 2,
          maximumFractionDigits: 0,
        });
      } else {
        currentAmount = value * 1;
        formattedValue = currentAmount?.toLocaleString("en-US", {
          style: "currency",
          currency: base_currency ?? "usd",
          // minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
          minimumFractionDigits: 0,
          // maximumFractionDigits: 2,
          maximumFractionDigits: 0,
        });
      }
      return {
        formattedValue,
        amount: currentAmount,
      };
    },
    [to, currency]
  );

  return getConvertedCost;
};

export default useCostConverterMain;
