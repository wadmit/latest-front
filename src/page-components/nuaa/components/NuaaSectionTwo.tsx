"use client";
import { theme } from "@/common/muicustomtheme/theme";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { usePageUnload } from "@/hooks";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SparkSvg } from "../svg";
import { badgeArray } from "../utils/provider";
import BadgeComponent from "./BadgeComponent";
import WiseScoreWelcome from "@/page-components/wisescore/WisescoreWelcome";
import WiseScoreModal from "@/page-components/wisescore/WisescoreModal";
import { NuaaScoreSvg } from "public/svg";
import WiseScoreSubmit from "@/page-components/wisescore/components/WisescoreSubmit";

type Props = {
  title: string;
  color?: string;
  scorePageUrl: string;
};

const NuaaSectionTwo = ({ title, color, scorePageUrl }: Props) => {
  const wiseScoreFormData = useAppSelector(
    (state) => state.eligibility.eligibilityformdata
  );

  const [showModal, setShowModal] = useState(false);

  const handleShowOrHideModel = () => {
    setShowModal((prev) => !prev);
  };
  usePageUnload();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",

        zIndex: 100,
        px: 10,
        [theme.breakpoints.down("md")]: {
          px: 2,
        },
      }}
      mt={{ lg: -57, md: -59, xs: -59, sm: -59 }}
    >
      <Stack mb={{ lg: 4 }} direction={{ xs: "row" }} justifyContent={"center"}>
        <Grid container alignItems={"center"}>
          <Grid item xs={12} lg={6}>
            <Stack justifyContent={"center"}>
              <Typography
                alignItems={"center"}
                textAlign={"center"}
                fontSize={{ xs: "24px", lg: "32px" }}
                fontFamily="HankenGroteskExtraBold"
                color={"#ffffff"}
              >
                Our Global&nbsp;
                <Typography
                  color={"#C1E0FF"}
                  fontSize={{ xs: "24px", lg: "32px" }}
                  fontFamily="HankenGroteskExtraBold"
                  component="span"
                >
                  Rankings
                  <SparkSvg />
                </Typography>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid
              ml={"5px"}
              container
              mt={{ lg: 0, md: "0", sm: "-10px", xs: "0px" }}
              spacing={2}
            >
              {badgeArray.map(({ number, title }) => {
                return (
                  <Grid mb="30px" px={"16px"} item xs={6}>
                    <BadgeComponent
                      key={number}
                      number={number}
                      title={title}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      <Box
        boxShadow={2}
        sx={{
          position: "relative",
          borderRadius: 1,
          bgcolor: "white",
          overflow: "hidden",
        }}
      >
        {wiseScoreFormData ? (
          <>
            <Typography mt={4} component="h1" variant="h3" textAlign="center">
              {/* We&apos;re checking your&nbsp; */}
              &#127881; &#127881; &#127881; We've got your&nbsp;
              <Typography color={color} variant="inherit" component="span">
                {title} Score
              </Typography>
              &#127881; &#127881; &#127881;
            </Typography>

            <Typography
              variant="subtitle1"
              textAlign="center"
              component="h2"
              my={2}
            >
              {/* Meanwhile, please enter your full name and email address so that
              <br /> we can send you your score */}
              Just so that you can find later, key in your details below and
              <br />
              we will send it your way.
            </Typography>
            <Stack mb={4} direction="row" justifyContent="center">
              <WiseScoreSubmit variant="nuaa" endPoint={scorePageUrl} />
            </Stack>
          </>
        ) : (
          <Box>
            <WiseScoreWelcome
              version="NuaaScore"
              sx={{
                backgroundImage: "url('/wisescore/swatch.svg')",
              }}
              header={{
                title: "NuaaScore",
                subHeader:
                  "a tool by WiseAdmit, recommends suitable programs based on your interests and academic history and evaluates your chance of acceptance into universities.",
              }}
              onClick={handleShowOrHideModel}
              primaryColor="#007aff"
              // this color is used as background in mobile screen
              secondaryColor="#C1E0FF"
            />
            {showModal && (
              <WiseScoreModal
                version="NuaaScore"
                endPoint="/nuaa/nuaa-score/result"
                variant="nuaa"
                secondaryColor="#C1E0FF"
                primaryColor="#007aff"
                Logo={NuaaScoreSvg}
                showModal={showModal}
                closeModal={handleShowOrHideModel}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NuaaSectionTwo;
