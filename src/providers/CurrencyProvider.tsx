"use client";
import type { ReactNode } from "react";
import { useEffect } from "react";

import {
  setCurrency,
  setLocation,
} from "@/global-states/reducers/currencyReducer";
import {
  socketConnect,
  socketDisconnectDispatch,
} from "@/global-states/reducers/socketReducer";
import { EBaseCurrency } from "@/types/university";
import axios from "axios";
import { useDispatch } from "react-redux";

const CurrencyList = [
  EBaseCurrency.USDOLLAR,
  EBaseCurrency.YUAN,
  EBaseCurrency.KOREANWON,
];

function CurrencyProvider({ children }: { children: ReactNode }) {

  const dispatch = useDispatch();
  const getCurrencyBasedOnBaseCurrency = async (
    baseCurrency: EBaseCurrency
  ) => {
    try {
      ("use server");
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency.toLowerCase()}.json`
      );
      const data = await response.json();
      dispatch(
        setCurrency({
          baseCurr: baseCurrency,
          data: data[baseCurrency],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getLocation = async () => {
    try {
      const { data } = await axios.get("https://ipapi.co/json");
      dispatch(
        setLocation({
          to: data?.currency?.toLowerCase() || "usd",
          currentCountry: data?.country_name,
          city: data?.city,
        })
      );
    } catch (err) {
      dispatch(setLocation({ to: null, currentCountry: null, city: null }));
    }
  };
  useEffect(() => {
    (async () => {
      const data = CurrencyList.map((currency) =>
        getCurrencyBasedOnBaseCurrency(currency)
      );
      await Promise.all([...data, getLocation()]);
    })();
  }, []);
  useEffect(() => {
    dispatch(socketConnect());
    return () => {
      dispatch(socketDisconnectDispatch());
    };
  }, []);
  return <>{children}</>;
}

export default CurrencyProvider;
