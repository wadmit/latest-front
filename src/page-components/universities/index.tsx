"use client";

import { ButtonWrapper, RootContainer } from "@/components/common";
import type { IUniversity } from "@/types/university";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  UniversityCard,
  UniversityFilter,
  UniversitySearchComponent,
} from "@/page-components/universities/components";
import Loader from "@/components/common/circular-loader/Loader";
import { useEffect, useState } from "react";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import ProgramUniversityHeader from "@/components/common/program-university-components/ProgramUniversityHeader";
import { useUniversitys } from "@/hooks/useUniversitys";
import Image from "next/image";

const UniversityHome = ({
  universities,
  paginate,
}: {
  universities: IUniversity[];
  paginate: {
    hasNext: boolean;
    total: number;
  };
}) => {
  const {
    isLoading,
    isSearchButtonLoading,
    universitiesData,
    hasNext,
    fetchNextUniversities,
    handleSearchChange,
    handleFilter,
    handleResetFilters,
  } = useUniversitys(paginate, universities);

  const [sortedUniversities, setSortedUniversities] =
    useState<IUniversity[]>(universitiesData);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const sortedData = [...universitiesData];

    sortedData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      }
      return nameB.localeCompare(nameA);
    });
    setSortedUniversities(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setSortedUniversities(universitiesData);
  }, [universitiesData]);
  return (
    <>
      <Stack bgcolor="#f9f9f9">
        <RootContainer>
          <ProgramUniversityHeader headerFor="university" />
          <UniversitySearchComponent
            isSearchButtonLoading={isSearchButtonLoading}
            handleSearchChange={handleSearchChange}
          />
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <UniversityFilter handleFilter={handleFilter} />
            </Grid>
            {isLoading && sortedUniversities.length === 0 ? (
              <Stack direction="row" justifyContent="center">
                <Loader center />
              </Stack>
            ) : (
              <Grid item lg={8} md={8} sm={12} xs={12} container spacing={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  mt={{ sm: "15px", xs: "20px" }}
                  pl={2}
                >
                  <Typography
                    color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
                    fontSize="16px"
                    fontStyle="normal"
                    fontFamily="HankenGroteskRegular"
                    lineHeight="160%"
                  >
                    Showing {sortedUniversities.length} results
                  </Typography>
                  <Button
                    style={{
                      background: "transparent",
                      borderRadius: "40px",
                      padding: "8px 22px",
                      border: "1px solid var(--Icon-Disable, #A3A3A9)",
                    }}
                    onClick={handleSort}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap="6px"
                    >
                      <Typography
                        color="var(--text-day-subtitle, rgba(32, 28, 26, 0.95))"
                        fontSize="14px"
                        fontStyle="normal"
                        fontFamily="HankenGroteskSemiBold"
                        lineHeight="120%"
                      >
                        Sort
                      </Typography>
                      <Image height={20} width={20} src="/images/common/sort.webp" alt="sort" />
                    </Box>
                  </Button>
                </Box>

                {sortedUniversities.length > 0 ? (
                  sortedUniversities.map((eachUniversity, index) => (
                    <Grid key={index} item lg={6} md={6} sm={6} xs={12}>
                      <Box bgcolor="white" borderRadius="12px">
                        <UniversityCard university={eachUniversity} />
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Box mx="auto">
                    <Typography variant="subtitle1" component="h3">
                      No university found
                    </Typography>
                    <ButtonWrapper
                      onClick={handleResetFilters}
                      sx={{
                        maxWidth: "7.5rem",
                        width: "100%",
                      }}
                    >
                      Refresh
                    </ButtonWrapper>
                  </Box>
                )}

                {hasNext && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    mt={4}
                    mb={5}
                  >
                    <Button
                      sx={{
                        border: "1px solid var(--icon-disable, #A3A3A9)",
                        borderRadius: "45px",
                        background: "white",
                        padding: "22px",
                      }}
                      onClick={() => {
                        setSortDirection("asc");
                        fetchNextUniversities();
                        analytics.websiteButtonInteractions({
                          buttonName: "See More",
                          pageName: "Universities",
                          source:
                            "User has clicked on See More button from Universities page",
                          urlPath: window.location.href,
                          event_type: EAnalyticsEvents.MORE_UNIVERSITIES,
                          status: EAnalyticsStatus.SUCCESS,
                          redirectPath: window.location.href,
                        });
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontStyle="normal"
                        fontFamily="HankenGroteskSemiBold"
                        lineHeight="120%"
                        color="#FF6B26"
                        textAlign="center"
                      >
                        {isLoading ? "Loading..." : "See more"}
                      </Typography>
                    </Button>
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </RootContainer>
      </Stack>
    </>
  );
};

export default UniversityHome;
