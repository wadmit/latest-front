"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ButtonWrapper, RootContainer } from "@/components/common";
import Loader from "@/components/common/circular-loader/Loader";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import {
  ProgramCard,
  ProgramSearchComponent,
  ProgramFilter,
} from "@/page-components/programs/components";
import { ProgramContext } from "@/context/program-context";
import { usePrograms } from "@/hooks";
import type { IProgram } from "@/types/program";
import ProgramUniversityHeader from "@/components/common/program-university-components/ProgramUniversityHeader";
import Image from "next/image";

const ProgramHome = ({
  programs,
  paginate,
}: {
  programs: IProgram[];
  paginate: {
    hasNext: boolean;
    total: number;
  };
}) => {
  const {
    isLoading,
    isSearchButtonLoading,
    programsData,
    hasNext,
    fetchNextPrograms,
    handleSearchChange,
    handleFilter,
    handleResetFilters,
  } = usePrograms(paginate, programs);
  const [sortedPrograms, setSortedrograms] = useState<IProgram[]>(programsData);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const sortedData = [...programsData];

    sortedData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      }
      return nameB.localeCompare(nameA);
    });
    setSortedrograms(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setSortedrograms(programsData);
  }, [programsData]);

  return (
    <Stack bgcolor="#f9f9f9">
      <ProgramContext.Provider value={programs}>
        <RootContainer>
          <ProgramUniversityHeader headerFor="program" />

          <ProgramSearchComponent
            isSearchButtonLoading={isSearchButtonLoading}
            handleSearchChange={handleSearchChange}
          />

          <Grid container spacing={2} marginTop="80px">
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <ProgramFilter handleFilter={handleFilter} />
            </Grid>

            {isLoading && sortedPrograms.length === 0 ? (
              <Stack direction="row" justifyContent="center">
                <Loader />
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
                    Showing {programsData.length} results
                  </Typography>
                  <Button
                    onClick={handleSort}
                    style={{
                      background: "transparent",
                      borderRadius: "40px",
                      padding: "8px 22px",
                      border: "1px solid var(--Icon-Disable, #A3A3A9)",
                    }}
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

                {sortedPrograms?.length > 0 ? (
                  sortedPrograms?.map((program, index) => (
                    <Grid key={index} item lg={12} md={12} sm={12} xs={12}>
                      <ProgramCard programs={program} />
                    </Grid>
                  ))
                ) : (
                  <Box mx="auto">
                    <Typography
                      variant="h5"
                      component="h4"
                      mb={3}
                      color="grey.500"
                    >
                      No Programs Found
                    </Typography>
                    <ButtonWrapper onClick={handleResetFilters}>
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
                        analytics.websiteButtonInteractions({
                          buttonName: "See More Programs",
                          source:
                            "User has clicked on See more Universities button from University page",
                          urlPath: window.location.href,
                          event_type: EAnalyticsEvents.MORE_PROGRAMS,
                          status: EAnalyticsStatus.SUCCESS,
                          redirectPath: "",
                        });
                        setSortDirection("asc");
                        if (!isLoading) {
                          fetchNextPrograms();
                        }
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontStyle="normal"
                        fontFamily="HankenGroteskSemiBold"
                        lineHeight="120%"
                        color="#FF6B26"
                        textAlign="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
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
      </ProgramContext.Provider>
    </Stack>
  );
};

export default ProgramHome;
