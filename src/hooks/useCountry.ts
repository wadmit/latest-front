import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { getCountries } from "@/api/web/country.action";
import { setCountryList } from "@/global-states/reducers/countryListReducer";

export const useCountries = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countryList.countryList);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        dispatch(setCountryList(response?.data?.data ?? []));
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, [dispatch]);

  return countries;
};
