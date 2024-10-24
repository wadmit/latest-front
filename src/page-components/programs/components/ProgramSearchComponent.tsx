import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { analytics } from "@/services/analytics.service";
import { useSearchParams } from "next/navigation";

function ProgramSearchComponent({
	handleSearchChange,
	isSearchButtonLoading,
}: {
	isSearchButtonLoading: boolean;
	handleSearchChange: (val: string) => void;
}) {
	const searchParams = useSearchParams();

	const [searchValue, setSearchValue] = useState(
		searchParams.get("searchTerm") || "",
	);

	useEffect(() => {
		if(!searchParams.get("searchTerm")) {
			setSearchValue("");
		}
	}, [searchParams.get("searchTerm")]);

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			columnGap={2}
			mt="3.125rem"
			mb="1.625rem"
			maxWidth="43.75rem"
			mx="auto"
			rowGap={2}
		>
			<Stack
				direction={{ md: "row", xs: "column" }}
				width="100%"
				justifyContent="space-between"
				alignItems="center"
				component="form"
				spacing={2}
			>
				<Box maxWidth="35.6875rem" width="100%">
					<TextFieldWrapper
						placeholder="Search for programs..."
						fullWidth
						value={searchValue}
						sx={{
							".MuiOutlinedInput-notchedOutline": {
								borderRadius: "8px !important",
							},
							".MuiInputBase-root": {
								background: "none",
							},
						}}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</Box>
				<Stack direction="row" gap={2} justifyContent="center">
					<Button
						onClick={(e) => {
							e.preventDefault();
							handleSearchChange(searchValue);
							analytics.searchKeyword({
								keyword: searchValue,
								source: "programs",
							});
						}}
						type="submit"
						sx={{
							background: "#FF6B26",
							color: "#FFFFFF",
							borderRadius: "8px",
							padding: "14.61px 56.8px",
							height: "48px",
							maxWidth: "100%",
						}}
					>
						{isSearchButtonLoading ? "Loading..." : "Search"}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default ProgramSearchComponent;
