import type { TShowIn } from "@/types/wisescore";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IWisescoreInitialValues } from "@/global-states/reducers/types";

const initialState: IWisescoreInitialValues = {
  programType: "",
  disciplineName: "",
  overallGrade: {},
  submitFormData: null,
  eligibilitySubjects: [],
  preferredCountry: "",
};

export const wiseScoreSlice = createSlice({
  name: "wiseScore",
  initialState,
  reducers: {
    setProgramType: (state, action: PayloadAction<TShowIn>) => ({
      ...state,
      programType: action.payload,
    }),
    setOverAllGradeType: (state, action: PayloadAction<any>) => ({
      ...state,
      overallGrade: action.payload,
    }),
    setSubmitFormData: (state, action: PayloadAction<any>) => ({
      ...state,
      submitFormData: action.payload,
    }),
    setSubjectsNeeded: (state, action: PayloadAction<any>) => ({
      ...state,
      eligibilitySubjects: action.payload,
    }),
    setDisciplineName: (state, action: PayloadAction<string>) => ({
      ...state,
      disciplineName: action.payload,
    }),
    setPreferredCountry: (state, action: PayloadAction<string>) => ({
      ...state,
      preferredCountry: action.payload,
    }),
  },
});

export const {
  setProgramType,
  setOverAllGradeType,
  setSubmitFormData,
  setDisciplineName,
  setSubjectsNeeded,
  setPreferredCountry,
} = wiseScoreSlice.actions;
export default wiseScoreSlice.reducer;
