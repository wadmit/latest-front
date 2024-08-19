"use client";
import React from "react";
import { MenuItem, Select } from "@mui/material";
import type { IInputBox } from "@/page-components/costcalculator/utils/types";

function InputBox({
	onCurrencyChange,
	currencyOptions = [],
	selectCurrency = "usd",
	currencyDisable = false,
}: IInputBox) {
	return (
		<div>
			<div>
				<Select
					size="small"
					value={selectCurrency}
					onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
					disabled={currencyDisable}
					style={{ padding: "0px 20px", borderRadius: "5px" }}
				>
					{currencyOptions.map((currency) => (
						<MenuItem key={currency} value={currency}>
							{currency.toLocaleUpperCase()}
						</MenuItem>
					))}
				</Select>
			</div>
		</div>
	);
}

export default InputBox;
