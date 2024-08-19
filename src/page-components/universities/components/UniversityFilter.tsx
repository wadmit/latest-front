import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilters } from "@/api/web/filters.action";
import { CacheConfigKey } from "@/constants";
import Loader from "@/components/common/circular-loader/Loader";
import FilterProgramUniversityAccordin from "@/components/common/program-university-components/FilterProgramUniversityAccordin";
import { setUniversityCountryList } from "@/global-states/reducers/universityCountryReducer";

function UniversityFilter({
	handleFilter,
}: {
	handleFilter: (queryParams: URLSearchParams) => void;
}) {
	const filters = useAppSelector((state) => state.universityList.filters);

	const dispatch = useAppDispatch();

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: [CacheConfigKey.FILTER_QUERY_KEY],
		queryFn: ({ signal }) => getFilters({ signal }),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60 * 24 * 365,
		enabled: !filters,
	});

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				setUniversityCountryList([
					{
						filterData: data,
						title: "Basic Filter",
					},
				]),
			);
		}
	}, [isSuccess, data, dispatch]);

	if (isLoading) return <Loader />;
	if (isError) return <Typography>Failed to fetch filters</Typography>;

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap="21px"
			position="sticky"
			top="10px"
		>
			<Box mt="5px">
				<Typography
					color="var(--text-day-subtitle, rgba(32, 28, 26, 0.95))"
					fontSize="18px"
					fontStyle="normal"
					fontFamily="HankenGroteskRegular"
					lineHeight="160%"
				>
					Filter makes things easier for you.
				</Typography>
			</Box>
			<Box
				border="1px solid var(--Scrim-Overlay, #E9E9E9)"
				bgcolor="#FFFFFF"
				borderRadius="12px"
				p={2}
			>
				{filters && filters.length > 0 ? (
					filters.map(({ title, filterData }) => {
						const localFilter = filterData.filter(
							(data) => data.query === "country",
						);
						return (
							<FilterProgramUniversityAccordin
								componentFor="university"
								key={`_${title}`}
								title={title}
								filterData={localFilter}
								handleFilter={handleFilter}
							/>
						);
					})
				) : (
					<Typography>Failed to fetch filters</Typography>
				)}
			</Box>
		</Box>
	);
}
export default UniversityFilter;
