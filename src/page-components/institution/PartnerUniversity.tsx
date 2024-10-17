"use client";
import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CountUp from "react-countup";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { universityImages } from "@/page-components/students/utils/provider";

import "swiper/css";

const PartnerUniversity = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      {isMobile ? (
        <Typography
          fontSize="18px !important"
          fontFamily="HankenGroteskExtraBold"
          lineHeight="31.2px"
          letterSpacing="-2%"
          mt="86px"
          component="h5"
        >
          Partners who love us
        </Typography>
      ) : (
        <Typography
          fontSize="24px"
          fontFamily="HankenGroteskExtraBold"
          lineHeight="31.2px"
          component="h5"
          letterSpacing="-2%"
          mt="104px"
          color="rgba(0, 0, 0, 0.6)"
        >
          We are partners with over{" "}
          <CountUp end={100} scrollSpyOnce enableScrollSpy /> Chinese
          universities
        </Typography>
      )}

      <Box
        width="100%"
        sx={{
          mt: { lg: "28px", md: "28px", sm: "34px", xs: "34px" },
          position: "relative",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "25%",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, white, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, white, transparent)",
          },
        }}
      >
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={7}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 9,
              spaceBetween: 40,
            },
          }}
        >
          {universityImages.map((image, index) => (
            <SwiperSlide key={index}>
              {({ isActive, isNext, isPrev }) => (
                <Box
                  sx={{
                    opacity: isActive ? 1 : isNext || isPrev ? 0.5 : 0.2,
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <img
                    loading="lazy"
                    alt="University Logo"
                    style={{
                      width: "68px",
                      height: "68px",
                      objectFit: "contain",
                    }}
                    src={image}
                  />
                </Box>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PartnerUniversity;
