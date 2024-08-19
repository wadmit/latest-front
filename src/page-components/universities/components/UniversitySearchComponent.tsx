import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { analytics } from "@/services/analytics.service";
import {
	Box,
	Button,
	CircularProgress,
	InputAdornment,
	Stack,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// function UniversitySearchComponent({
// 	isLoading,
// 	handleSearchChange,
// }: {
// 	isLoading: boolean;
// 	handleSearchChange: (val: string) => void;
// }) {
// 	const searchParams = useSearchParams();

// 	const [searchTerm, setSearchTerm] = useState(
// 		searchParams.get("searchTerm") || "",
// 	);
// 	return (
// 		<Stack
// 			direction={{ md: "row", xs: "column" }}
// 			justifyContent="center"
// 			alignItems="center"
// 			columnGap={2}
// 			my={6}
// 			maxWidth="40rem"
// 			mx="auto"
// 			rowGap={2}
// 		>
// 			<Box maxWidth="31.375rem" width="100%" flexShrink={0}>
// 				<Box position="relative">
// 					<TextFieldWrapper
// 						placeholder="Search for universities"
// 						fullWidth
// 						value={searchTerm}
// 						onChange={(e) => {
// 							setSearchTerm(e.target.value);
// 						}}
// 						sx={{
// 							".MuiOutlinedInput-notchedOutline": {
// 								borderRadius: "8px !important",
// 							},
// 							".MuiInputBase-root": {
// 								background: "none",
// 							},
// 						}}
// 					/>
// 				</Box>
// 			</Box>

// 			<Stack direction="row" spacing={1}>
// 				<Button
// 					onClick={(e) => {
// 						e.preventDefault();
// 						handleSearchChange(searchTerm);
// 						analytics.searchKeyword({
// 							keyword: searchTerm,
// 							source: "universities",
// 						});
// 					}}
// 					type="submit"
// 					style={{
// 						background: "#FF6B26",
// 						color: "#FFFFFF",
// 						borderRadius: "8px",
// 						padding: "14.61px 56.8px",
// 						height: "48px",
// 					}}
// 				>
// 					{isLoading ? "Searching..." : "Search"}
// 				</Button>
// 			</Stack>
// 		</Stack>
// 	);
// }

function UniversitySearchComponent({
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
						placeholder="Search for universities..."
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
								source: "universities",
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

export default UniversitySearchComponent;
