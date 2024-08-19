"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { useDispatch } from "react-redux";
import axios from "axios";
import { EBaseCurrency } from "@/types/university";
import { useAppSelector } from "@/global-states/hooks/hooks";
import {
  setCurrency,
  setLocation,
} from "@/global-states/reducers/currencyReducer";
import {
  socketConnect,
  socketDisconnectDispatch,
} from "@/global-states/reducers/socketReducer";

const CurrencyList = [
  EBaseCurrency.USDOLLAR,
  EBaseCurrency.YUAN,
  EBaseCurrency.KOREANWON,
];

function CurrencyProvider({ children }: { children: ReactNode }) {
  const [showSurvey, setShowSurvey] = useState(false);

  const dispatch = useDispatch();
  const user = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.email
  );
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
      // Log or handle error appropriately
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
  // const _ = useQuery(['check survey', showSurvey], () => studentService.checkSurvey(), {
  //     onSuccess: (data) => {
  //         if (data.hasSubmitted) {
  //             setShowSurvey(false)
  //         } else {
  //             setShowSurvey(true)
  //         }
  //     },
  //     onError: () => {
  //         setShowSurvey(false)
  //     },
  //     enabled: !!user
  // })

  return <>{children}</>;
}

export default CurrencyProvider;
