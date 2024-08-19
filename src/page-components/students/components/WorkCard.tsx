"use client";
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import SmallImageOne from "$/images/home/SmallImageOne.webp";
import SmallImageTwo from "$/images/home/SmallImgTwo.webp";
import SmallImageThree from "$/images/home/SmallImgThree.webp";
import SmallImageFour from "$/images/home/SmallImgFour.webp";
import Image from "next/image";
import { theme } from "@/common/muicustomtheme/theme";

const WorkCard = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Grid container spacing={2}>
      {/* First Row */}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Image
          alt="get-your-wisescore"
          src={SmallImageOne}
          width={100000000}
          height={1}
          style={{
            width: "100%",
            height: isSmallScreen ? "400px" : "572px",
          }}
        />

        {/* {isSmallScreen ? (
          <Image alt="WiseImage" src={SmallImageOne} />
        ) : (
          <Image src={ImageOne} alt="WiseImage" />
        )} */}
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Image
          alt="shortlist-program"
          src={SmallImageTwo}
          width={100000000}
          height={1}
          style={{
            width: "100%",
            height: isSmallScreen ? "400px" : "572px",
          }}
        />
        {/* {isSmallScreen ? (
          <Image alt="WiseImage" src={SmallImageTwo} />
        ) : (
          <Image alt="WiseImage" src={ImageTwo} />
        )} */}
      </Grid>
      {/* Second Row */}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        {/* {isSmallScreen ? (
          <Image alt="WiseImage" src={SmallImageThree} />
        ) : (
          <Image alt="WiseImage" src={ImageThree} />
        )} */}
        <Image
          alt="view-application"
          src={SmallImageThree}
          width={100000000}
          height={1}
          style={{
            width: "100%",
            height: isSmallScreen ? "400px" : "572px",
          }}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        {/* {isSmallScreen ? (
          <Image alt="WiseImage" src={SmallImageFour} />
        ) : (
          <Image alt="WiseImage" src={ImageFour} />
        )} */}
        <Image
          alt="start-your-journey"
          src={SmallImageFour}
          width={100000000}
          height={1}
          style={{
            width: "100%",
            height: isSmallScreen ? "400px" : "572px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default WorkCard;
