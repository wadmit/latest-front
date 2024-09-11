import { EBaseCurrency } from "@/types/university";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ICurrencyStateRedux } from "@/global-states/reducers/types";

const initialState: ICurrencyStateRedux = {
  currency: null,
  to: null,
  currentCountry: null,
  city: null,
};

export const CurrencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{ baseCurr: EBaseCurrency; data: any }>
    ) => ({
      ...state,
      currency: {
        ...state.currency,
        [action.payload.baseCurr]: action.payload.data,
      },
    }),

    setLocation: (
      state,
      action: PayloadAction<{
        to: string | null;
        currentCountry: string | null;
        city: string | null;
      }>
    ) => ({
      ...state,
      to: action.payload.to,
      currentCountry: action.payload.currentCountry,
      city: action.payload.city,
    }),
  },
});

export const { setCurrency, setLocation } = CurrencySlice.actions;

export default CurrencySlice.reducer;
