"use client";
import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { universityImages } from "@/page-components/students/utils/provider";
import Image from "next/image";

function PartnerUni() {
  SwiperCore.use([Autoplay]);
  const ref = React.useRef(null);
  return (
    <Box
      ref={ref}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={{ lg: "155px", md: "135px", sm: "125px", xs: "105px" }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "20px", xs: "18px" }}
          fontFamily="HankenGroteskExtraBold"
          lineHeight={{ lg: "20px", md: "20px", sm: "22px", xs: "23.4px" }}
          letterSpacing="-2%"
          color="rgba(0, 0, 0, 0.6)"
          textAlign="center"
          component={"h5"}
        >
          Earn a degree from one of the world’s Top-Ranked universities
        </Typography>
      </Box>
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
        mt="32px"
      >
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={10}
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
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 10,
              spaceBetween: 10,
            },
          }}
        >
          {universityImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Box width="68px" height="68px">
                <Image
                  width={1000}
                  height={1000}
                  loading="lazy"
                  alt="University Logo"
                  style={{
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  src={image}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default PartnerUni;
