"use client";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ApplicationStatus } from "@/page-components/dashboard/applications/types";
import {
  getUserApplications,
  setUserApplications,
} from "@/global-states/reducers/applicationReducer";
import { AlertButtonProps } from "@/page-components/dashboard/utils/type";
import { Divider, Stack } from "@mui/material";
import Alert from "@/page-components/dashboard/components/Alert";
import {
  ApplicationDynamicTable,
  ApplicationStatusHeader,
} from "@/page-components/dashboard/applications/components";
import { getApplicationsStudent } from "@/api/web/application.action";
import { useCustomQuery } from "@/hooks/useCustomQuery";

type Props = {};

const ApplicationPageComponent = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [applicationWithStatus, setApplicationWithStatus] =
    useState<ApplicationStatus>({
      paid: [],
      unpaid: [],
    });
  const userApplications = useAppSelector(getUserApplications);

  const { data, isLoading: applicationsLoading } = useCustomQuery({
    queryKey: ["Applications/GET", Object.fromEntries(searchParams), "student"],
    queryFn: async () => await getApplicationsStudent(),
    onSuccess: (res) => {
      console.log(res);
      dispatch(setUserApplications({ data: res }));
    },
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   const initialObject: ApplicationStatus = {
  //     paid: [],
  //     unpaid: [],
  //   };
  //   if (userApplications.length > 0) {
  //     if (userApplications.length > 0) {
  //       const { paid, unpaid } = userApplications.reduce((acc, item) => {
  //         if (item.paid) {
  //           acc.paid.push(item);
  //         } else {
  //           acc.unpaid.push(item);
  //         }
  //         return acc;
  //       }, initialObject);

  //       setApplicationWithStatus({ paid, unpaid });
  //     }
  //   }
  // }, [userApplications]);

  const isUserProfileComplete = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.isProfileComplete
  );

  // Alert button props for completing profile
  const completeProfileAlertProps: AlertButtonProps = {
    buttonName: "Complete Profile",
    buttonClick: () => router.push("/dashboard/profile/edit-profile"),
  };

  return (
    <Stack mt={3} mb={-2}>
      {!isUserProfileComplete && (
        <Alert
          variant="pending"
          text="You won't be able to submit your application until you complete the profile"
          iconType="pending"
          buttonProps={completeProfileAlertProps}
        />
      )}
      <ApplicationStatusHeader value="Application you have NOT paid for" />
      <ApplicationDynamicTable
        status={false}
        statusHeader="Unpaid Applications"
        isLoading={applicationsLoading}
        applications={applicationWithStatus.unpaid}
      />

      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "var(--greyscale-100, #D9E2EC)",
          marginTop: "48px",
        }}
      />
      <ApplicationStatusHeader value="Application you have  paid for" />
      <ApplicationDynamicTable
        isLoading={applicationsLoading}
        status
        applications={applicationWithStatus.paid}
        statusHeader="Paid Applications"
      />
    </Stack>
  );
};

export default ApplicationPageComponent;
