import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getPrograms } from "@/api/web/program.action";
import type { IProgram } from "@/types/program";

interface IProgramHookReturn {
	isLoading: boolean;
	isSearchButtonLoading: boolean;
	programsData: IProgram[];
	hasNext: boolean;
	fetchNextPrograms: () => void;
	handleSearchChange: (val: string) => void;
	handleFilter: (queryParams: URLSearchParams) => void;
	handleFilterChange: (e: SelectChangeEvent<HTMLInputElement>) => void;
	handleResetFilters: () => void;
}

export function usePrograms(
	paginate: {
		hasNext: boolean;
		total: number;
	},
	programs: IProgram[],
): IProgramHookReturn {
	const [programsData, setProgramsData] = useState(programs);
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
			const response = await getPrograms(
				new URLSearchParams({ page: "1", limit: "12" }),
			);
			setProgramsData(response.data);
			router.push("/programs?limit=12&page=1", {
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

	const fetchNextPrograms = async () => {
		const currentParams = handlePageParams();

		if(currentParams && currentParams.get('type')){
			queryParams.append("type", currentParams.get('type')!);
		}
		if(currentParams && currentParams.get('country')){
			queryParams.append("country", currentParams.get('country')!);
		}
		try {
			if (hasNext) {
				queryParams.append("page", String(page + 1));
				setIsLoading(true);
				const response = await getPrograms(queryParams);
				if (response && response.data.length > 0) {
					setProgramsData([...programsData, ...response.data]);
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
		router.replace(`/programs?${queryParams.toString()}`, { scroll: true });
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

		const response = await getPrograms(currentQuery);
		if (response && response.data.length > 0) {
			setProgramsData([...response.data]);
			setHasNext(response.paginate.hasNext);
		} else {
			setProgramsData([]);
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
			const disciplineFilterRes = await getPrograms(queryParams);
			setProgramsData(disciplineFilterRes.data);
			setHasNext(disciplineFilterRes.paginate.hasNext);
			handleUrlChange(queryParams);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterChange = async (e: SelectChangeEvent<HTMLInputElement>) => {
		const disciplineFilterRes = await getPrograms(queryParams);
		setProgramsData(disciplineFilterRes.data);
		setHasNext(disciplineFilterRes.paginate.hasNext);
		handleUrlChange(queryParams);
		// setAllPrograms(disciplineFilterRes.data.total);
		// switch (e.target.name) {
		//   case "discipline":
		//     {
		//       // const { query } = router;
		//       const disciplineFilterRes = await getPrograms(queryParams)
		//       setProgramsData(disciplineFilterRes.data);
		//       setHasNext(disciplineFilterRes.paginate.hasNext);
		//       // setAllPrograms(disciplineFilterRes.data.total);
		//       handleUrlChange(queryParams)
		//     }
		//     break;
		//   case "filter":
		//     {
		//       const { query } = router;
		//       const limitFilterRes = await ApiService.get({
		//         url: `${ApiConfig.programs}?${
		//           query.searchTerm ? `searchTerm=${query.searchTerm}&` : ""
		//         }limit=${e.target.value}&page=${
		//           router.query.page ? router.query.page : 1
		//         }`,
		//         tokenNeeded: false,
		//       });
		//       setProgramsData(limitFilterRes.data.data);
		//       router.push(
		//         `?${
		//           query.searchTerm ? `searchTerm=${query.searchTerm}&` : ""
		//         }limit=${e.target.value}&page=${
		//           router.query.page ? router.query.page : 1
		//         }`,
		//         undefined,
		//         {
		//           shallow: true,
		//           scroll: false,
		//         }
		//       );
		//     }
		//     break;
		//   default:
		//     break;
		// }
	};

	return {
		isLoading,
		isSearchButtonLoading,
		programsData,
		hasNext,
		fetchNextPrograms,
		handleSearchChange,
		handleFilter,
		handleFilterChange,
		handleResetFilters,
	};
}
