import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApiService from "@/services/api.service";
import { ApiConfig } from "@/constants";
import type { IUniversity } from "@/types/university";
import type { SelectChangeEvent } from "@mui/material";
import { getUniversities } from "@/api/web/university.action.";

interface IUniversityHookReturn {
	isLoading: boolean;
	isSearchButtonLoading: boolean;
	universitiesData: IUniversity[];
	hasNext: boolean;
	fetchNextUniversities: () => void;
	handleSearchChange: (val: string) => void;
	handleFilter: (queryParams: URLSearchParams) => void;
	handleFilterChange: (e: SelectChangeEvent<HTMLInputElement>) => void;
	handleResetFilters: () => void;
}
export function useUniversitys(
	paginate: {
		hasNext: boolean;
		total: number;
	},
	universities: IUniversity[],
): IUniversityHookReturn {
	const [universitiesData, setUniversitiesData] = useState(universities);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearchButtonLoading, setIsSearchButtonLoading] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const queryParams = new URLSearchParams();

	const [hasNext, setHasNext] = useState(paginate?.hasNext);

	const [page, setPage] = useState(1);

	const handleResetFilters = async () => {
		try {
			setIsLoading(true);
			const response = await getUniversities(
				new URLSearchParams({ page: "1", limit: "12" }),
			);
			setUniversitiesData(response.data);
			router.push("/universities?limit=12&page=1", {
				scroll: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handlePageParams = () => {
		searchParams.forEach((value, key) => {
			queryParams.append(key, value);
		});

		return queryParams;
	};

	const fetchNextUniversities = async () => {
		handlePageParams();

		// console.log("fetchNextUniversities",currentParams);
		// console.log("fetchNextUniversities",queryParams);
		try {
			if (hasNext) {
				queryParams && queryParams.delete("page");
				queryParams.append("page", String(page + 1));
				setIsLoading(true);
				const response = await getUniversities(queryParams);
				if (response && response.data.length > 0) {
					setUniversitiesData([...universitiesData, ...response.data]);
					setHasNext(response.paginate.hasNext);
				}
				setIsLoading(false);
				setPage((prev) => prev + 1);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleUrlChange = async (queryParams: URLSearchParams) => {
		router.replace(`/universities?${queryParams.toString()}`, { scroll: true });
	};

	const handleSearchChange = async (val: string) => {
		setIsSearchButtonLoading(true);
		const currentQuery = handlePageParams();
		//removing old query and updating with new one
		if (val) {
			if (currentQuery.has("searchTerm")) {
				currentQuery.delete("searchTerm");
			}
			currentQuery.set("searchTerm", val);
		} else {
			currentQuery.delete("searchTerm");
		}

		const response = await getUniversities(currentQuery);
		if (response && response.data.length > 0) {
			setUniversitiesData([...response.data]);
			setHasNext(response.paginate.hasNext);
		} else {
			setUniversitiesData([]);
			setHasNext(false);
		}
		handleUrlChange(currentQuery);
		setIsSearchButtonLoading(false);
	};

	const handleFilter = async (queryParams: URLSearchParams) => {
		setIsLoading(true);
		setPage(1);
		queryParams.append("page", "1");

		try {
			const disciplineFilterRes = await getUniversities(queryParams);
			setUniversitiesData(disciplineFilterRes.data);
			setHasNext(disciplineFilterRes.paginate.hasNext);
			handleUrlChange(queryParams);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterChange = async (e: SelectChangeEvent<HTMLInputElement>) => {
		const disciplineFilterRes = await getUniversities(queryParams);
		setUniversitiesData(disciplineFilterRes.data);
		setHasNext(disciplineFilterRes.paginate.hasNext);
		handleUrlChange(queryParams);
	};

	return {
		isLoading,
		isSearchButtonLoading,
		universitiesData,
		hasNext,
		fetchNextUniversities,
		handleSearchChange,
		handleFilter,
		handleFilterChange,
		handleResetFilters,
	};
}
