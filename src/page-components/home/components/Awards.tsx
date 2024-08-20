import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { RootContainer } from "@/components/common";
import {
  awardImages,
  awardImagesAlts,
} from "@/page-components/home/utils/provider";

const Awards = () => {
  return (
    <RootContainer
      mt="80px"
      // sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" } }}
    >
      <Box display="flex" justifyContent="center">
        <Typography
          fontSize={{ lg: "28px", md: "28px", sm: "18px", xs: "18px" }}
          fontWeight={800}
          fontFamily="HankenGroteskExtraBold"
          lineHeight="36.4px"
          textAlign={{
            lg: "left",
            md: "left",
            sm: "center",
            xs: "center",
          }}
          letterSpacing="-3%"
          color="rgba(32, 28, 26, 1)"
          component="h3"
        >
          Awards and recognitions
        </Typography>
      </Box>
      <Grid container columnSpacing={"42px"} mt="48px">
        {awardImages.map((eachImage, index) => {
          return (
            <Grid key={index} item lg={3} md={6} sm={6} xs={12}>
              <Image
                key={index}
                style={{
                  // position: "relative",
                  objectFit: "contain",
                  width: "100%",
                  height: "80px",
                }}
                width={100000}
                height={65}
                alt={awardImagesAlts[index]}
                src={eachImage}
              />
            </Grid>
          );
        })}
      </Grid>
    </RootContainer>
  );
};

export default Awards;
