"use client";
import { RootContainer } from "@/components/common";
import { IScholarshipResponse } from "@/types/utils";
import { Box, debounce, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AvailableScholarshipHeader from "./AvailableScholarshipHeader";
import AvailableScholarshipBody from "./AvailableScholarshipBody";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import { getScholarships } from "@/api/web/scholarship.action";
import useCostConverterMain from "@/hooks/costConverterMain";

type Props = {
  scholarships: IScholarshipResponse;
};

const AvailableScholarship = ({ scholarships }: Props) => {
  const getConvertedCosts = useCostConverterMain();

  const [hasMainWiseScore, setHasMainWiseScore] = useState(false);
  const [allScholarships, setAllScholarships] =
    useState<IScholarshipResponse>(scholarships);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const mainWisescore = localStorage.getItem("wisescore");
    setHasMainWiseScore(!!mainWisescore);
  }, []);

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: [CacheConfigKey.SCHOLARSHIP_QUERY_KEY, searchTerm],
    initialPageParam: 1,
    queryFn: () => getScholarships({ searchTerm }),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.data.paginate?.hasMore ? pages.length + 1 : undefined,
  });

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  return (
    <Box
      bgcolor={
        hasMainWiseScore ? "rgba(229, 242, 255, 1)" : "rgba(240, 234, 230, 1)"
      }
      pt="1px"
      pb="1px"
    >
      <RootContainer
        mt={{ lg: "3rem", md: "6rem", sm: "2rem", xs: "2rem" }}
        mb={{ lg: "4.25rem", md: "4.25rem", sm: "2rem", xs: "2rem" }}
      >
        <AvailableScholarshipHeader />
        <AvailableScholarshipBody
          handleSearch={handleSearch}
          allScholarships={allScholarships}
          loading={isFetching || isLoading}
          getConvertedCosts={getConvertedCosts}
        />
      </RootContainer>
    </Box>
  );
};

export default AvailableScholarship;
