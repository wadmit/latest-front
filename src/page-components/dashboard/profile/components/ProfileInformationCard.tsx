"use client";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { selectCountryList } from "@/global-states/reducers/countryListReducer";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import {
  CustomInfoBox,
  CustomProfileCard,
} from "@/page-components/dashboard/profile/styled-components";
import { Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { memo, useMemo } from "react";

type Props = {
  data: { label: string; name: string }[];
  title: string;
};

const ProfileInformationCard = ({ data, title }: Props) => {
  const user = useAppSelector(selectDashboardDataGlobal);
  const dashboardData = useMemo(() => user, [user]);
  const countryList = useAppSelector(selectCountryList);
  return (
    <CustomProfileCard>
      <FormHeaders title={title} />
      <Grid
        container
        rowGap={{ xl: 2, xs: 1 }}
        columnGap={3}
        justifyContent="space-between"
        mt={4}
      >
        {data.map((item) => (
          <Grid item xs={12} md={3}>
            <Stack direction="column" columnGap={4}>
              <Typography variant="subtitle1_sb">
                <CustomInfoBox
                  display={{ xs: "flex" }}
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "90%",
                      flexDirection: "row !important",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  }}
                >
                  {item.label}:
                  <Typography variant="subtitle1" component="span">
                    {dashboardData &&
                      (item.name !== "date_of_birth" &&
                      item.name !== "passport_expiry_date" ? (
                        item.name === "country_of_education" ||
                        item.name === "country" ||
                        item.name === "country_of_citizenship" ? (
                          countryList.find(
                            (country) =>
                              country.id ===
                              (dashboardData.data?.detail as any)[item.name]
                          )?.name
                        ) : (
                          <span>
                            {(dashboardData.data as any)[item.name] ||
                              (dashboardData?.data?.detail as any)[item.name]}
                          </span>
                        )
                      ) : (
                        <span>
                          {dashboardData.data?.detail[item.name] &&
                            moment(
                              dashboardData.data?.detail[item.name]
                            ).format("DD/MM/YYYY")}
                        </span>
                      ))}
                  </Typography>
                </CustomInfoBox>
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </CustomProfileCard>
  );
};

export default memo(ProfileInformationCard);
