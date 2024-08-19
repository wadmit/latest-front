import { DashboardWrapper } from "@/components/common";
import CategoryButton from "@/components/common/buttons/CategoryButton";
import { PersistentSidebar } from "@/components/common/persistentsidebar/PersistentSidebar";
import { Box } from "@mui/material";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PersistentSidebar>
      <Box
        sx={{
          bgcolor: "white",
          pt: 3.5,
          pb: 10.5,
          minHeight: "100vh",
        }}
        component="section"
      >
        {/* {showSurvey && <Survey />} */}
        <CategoryButton />
        <DashboardWrapper>{children}</DashboardWrapper>
      </Box>
    </PersistentSidebar>
  );
};

export default layout;
