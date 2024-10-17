import { Box, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { DashboardWrapper } from "../wrapper/DashboardWrapper";
import { WiseAdmitColorFulSvg } from "public/svg";
import { TemporarySidebar } from "./TemporarySidebar";
import dynamic from "next/dynamic";
import UserBox from "./UserBox";
// const UserBox = dynamic(() => import('./UserBox'),{
//   ssr: false,
//   suspense: true
// });

export function AuthNavbar({ handleDrawerOpen }: any) {
  const pathname = usePathname();
  const [header, setHeader] = useState("");

  useEffect(() => {
    const splitPath = pathname.split("/");
    const selectedPath = splitPath[splitPath.length - 1];
    switch (selectedPath) {
      case "dashboard":
        setHeader("Dashboard");
        break;
      case "profile":
        setHeader("My Profile");
        break;
      case "documents":
        setHeader("Documents hub");
        break;
      case "applications":
        setHeader("My Applications");
        break;
      case "universitiesandprograms":
        setHeader("University and Program");
        break;

      default:
        setHeader("Show Application");
        break;
    }
  }, [pathname]);
  return (
    <Box
      bgcolor="grey.A400"
      height={{ md: "3.75rem", xl: "6.25rem" }}
      position="relative"
      top={0}
      width="100%"
      zIndex={900}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0px 5px 20px 0px rgba(0, 0, 0, 0.05)"
    >
      <DashboardWrapper
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Stack
            ml={-2}
            direction="row"
            gap={{ xs: 2, md: 5 }}
            alignItems="center"
          >
            <Box display={{ xs: "block", lg: "none" }}>
              <TemporarySidebar />
            </Box>

            <Box display={{ xs: "none", md: "flex", sm: "flex" }}>
              <Typography fontSize=" 1.25rem" variant="h4" component="h4">
                {header}
              </Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              "& svg": {
                width: "130px",
                height: "60px",
              },
            }}
            display={{ lg: "none", md: "none", sm: "none", xs: "flex" }}
          >
            <WiseAdmitColorFulSvg />
          </Stack>
          <Stack>
            <Suspense fallback="loading...">
              <UserBox />
            </Suspense>
          </Stack>
        </Stack>
      </DashboardWrapper>
    </Box>
  );
}
