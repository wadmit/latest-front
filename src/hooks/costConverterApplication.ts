import { useEffect, useState } from "react";
import axios from "axios";

import useCurrencyApplication from "@/hooks/useCurrencyApplication";

const useCostConverterApplication = () => {
	const [currencyInfo, error] = useCurrencyApplication();
	const [to, setTo] = useState<string>("cny"); // currency type

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

	const getConvertedCosts = (val: number) => {
		const currentTo = !error ? to : "usd";

		const formattedValue = (val * currencyInfo[currentTo])?.toLocaleString(
			"en-US",
			{
				style: "currency",
				currency: currentTo,
				minimumFractionDigits: Number.isInteger(val) ? 0 : 2,
				maximumFractionDigits: 2,
			},
		);

		return formattedValue || ""; // Ensure a valid string is always returned
	};

	return getConvertedCosts;
};

export default useCostConverterApplication;
