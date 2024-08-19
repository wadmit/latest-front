"use client";
import { ButtonWrapper, DashboardContentContainer } from "@/components/common";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ProfileInformationCard from "@/page-components/dashboard/profile/components/ProfileInformationCard";
import {
  addressDetail,
  parentDetail,
  personalInfo,
} from "@/page-components/dashboard/profile/utils/provider";
import DeleteProfileComponent from "@/page-components/dashboard/profile/components/DeleteProfileComponent";
import ProfileCard from "./ProfileCard";

const ProfilePageComponent = () => {
  const dashboardData = useAppSelector(selectDashboardDataGlobal);

  //   useEffect(() => {
  //     setConsentGiven(consent)
  //   }, [consent])
  const handleUnsubscribe = () => {
    console.log("unsubscribe");
  };
  return (
    <DashboardContentContainer>
      <ProfileCard student={dashboardData?.data} />
      {/* --------------------------------------INFORMATION-------------------------------------- */}
      <Box minHeight="90vh">
        <ProfileInformationCard
          data={personalInfo}
          title="Personal Information"
        />
        <ProfileInformationCard data={addressDetail} title="Address Detail" />
        <ProfileInformationCard
          data={parentDetail}
          title="Parents/Guardians Details"
        />
      </Box>

      <Box gap={"10px"} display="flex" justifyContent="flex-end" my={2}>
        <DeleteProfileComponent />
        {true && (
          <Box
            width="139px"
            // sx={{ position: 'absolute', top: '10px', right: '60px' }}
          >
            <ButtonWrapper onClick={handleUnsubscribe}>
              Unsubscribe Whatsapp
            </ButtonWrapper>
          </Box>
        )}
      </Box>
    </DashboardContentContainer>
  );
};

export default ProfilePageComponent;
