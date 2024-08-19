import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { RootContainer } from "@/components/common";
import {
  supportAltTags,
  supportImages,
} from "@/page-components/home/utils/provider";
import { Height } from "@mui/icons-material";

const Support = () => {
  SwiperCore.use([Autoplay]);

  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const propTags = [
    {
      lg: { width: "135.114px", height: "56px" },
      sm: { width: "69.97px", height: "29px" },
    },
    {
      lg: { width: "110px", height: "44.715px" },
      sm: { width: "57px", height: "23.171px" },
    },
    {
      lg: { width: "151.55px", height: "35.915px" },
      sm: { width: "67.44px", height: "15.981px" },
    },
    {
      lg: { width: "46px", height: "61.15px" },
      sm: { width: "26px", height: "34.563px" },
    },
    {
      lg: { width: "190px", height: "50.214px" },
      sm: { width: "95px", height: "25px" },
    },
  ];

  return (
    <RootContainer mt="80px">
      <Box display="flex" justifyContent="center">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
          fontFamily="HankenGroteskExtraBold"
          lineHeight="26px"
          textAlign={{
            lg: "left",
            md: "left",
            sm: "center",
            xs: "center",
          }}
          letterSpacing="-2%"
          color="rgba(0, 0, 0, 0.6)"
          component="h4"
        >
          We are supported by
        </Typography>
      </Box>
      <Box display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}>
        <Box
          // bgcolor="white"
          pb={{
            lg: "96px",
            md: "96px",
            sm: "80px",
            xs: "80px",
          }}
          ref={ref}
          width="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            sx={{
              overflowx: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "&  .swiper-wrapper": {
                transitionTimingFunction: "linear !important",
              },
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={{ lg: "32px", md: "32px", sm: "34px", xs: "34px" }}
          >
            <Swiper
              modules={[Autoplay]}
              loop
              slidesPerView={4}
              spaceBetween={50}
              speed={1500}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                960: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
            >
              {supportImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box
                    border="1px solid rgba(233, 233, 233, 1)"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // width={"280px"}
                    height={"117px"}
                  >
                    <Image
                      width={1000}
                      height={1}
                      style={{
                        width: propTags[index].lg.width,
                        height: propTags[index].lg.height,
                        objectFit: "cover",
                      }}
                      loading="lazy"
                      alt={supportAltTags[index]}
                      src={image}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        display={{ lg: "none", md: "none", sm: "flex", xs: "flex" }}
        mt="34px"
        gap="20px"
      >
        {supportImages.map((image, index) => (
          <Grid item xs={5.5} key={index}>
            <Box
              width="100%"
              height="65px"
              border="1px solid rgba(233, 233, 233, 1)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                width={1000}
                height={1}
                style={{
                  width: propTags[index].sm.width,
                  height: propTags[index].sm.height,
                  objectFit: "cover",
                }}
                loading="lazy"
                alt={supportAltTags[index]}
                src={image}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </RootContainer>
  );
};

export default Support;
