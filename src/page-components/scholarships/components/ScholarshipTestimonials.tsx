"use client";
import React, { useRef } from "react";
import Image from "next/image";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import { testimonialScholarshipData } from "@/page-components/scholarships/utils/provider";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { RootContainer } from "@/components/common";
import Quote from "public/images/scholarships/scholarshiptestimonialquote.svg";
import { ClickableArrowScholarship } from "public/svg";

// Initialize Swiper core and add Navigation and Pagination modules
SwiperCore.use([Navigation, Pagination]);

const ScholarshipTestimonials = () => {
  const swiperRef = useRef(null) as any;
  const isMobile = useMediaQuery("(max-width:600px)");

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const navigationConfig = isMobile
    ? {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }
    : true;

  return (
    <RootContainer
      mt={{ lg: "6rem", md: "6rem", sm: "5rem", xs: "4rem" }}
      mb="6.25rem"
    >
      <style>
        {`
          @media screen and (max-width: 1280px) {
            .swiper-container {
              width: 1108px;
            }
          }
        `}
      </style>

      <Swiper
        ref={swiperRef}
        spaceBetween={-400}
        slidesPerView={2}
        // navigation={{
        //   prevEl: ".swiper-button-prev",
        //   nextEl: ".swiper-button-next",
        // }} // Enable navigation arrows
        navigation={navigationConfig}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "custom",
          renderCustom(swiper, current, total) {
            return `<div class="swiper-pagination">
                      <div class="swiper-button-prev"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-button-next"></div>
                    </div>`;
          },
        }} // Enable pagination
        breakpoints={{
          270: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {testimonialScholarshipData.map((eachdata, index) => (
          <SwiperSlide key={index}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="32px"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="32px"
                width={{ lg: "796px", md: "796px", sm: "100%", xs: "100%" }}
              >
                <Box>
                  <Quote />
                </Box>
                <Box>
                  <Typography
                    fontWeight={600}
                    fontFamily="HankenGroteskSemiBold"
                    fontSize={{
                      lg: "20px",
                      md: "20px",
                      sm: "16px",
                      xs: "16px",
                    }}
                    lineHeight={{
                      lg: "26px",
                      md: "26px",
                      sm: "20.8px",
                      xs: "20.8px",
                    }}
                    letterSpacing="-3%"
                    component="p"
                    color="rgba(32, 28, 26, 1)"
                    textAlign="center"
                  >
                    "{eachdata.desc}"
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="12px"
                >
                  <Box
                    height="72px"
                    width="72px"
                    borderRadius="100%"
                    overflow="hidden"
                  >
                    <Image
                      alt="student"
                      src={eachdata.img}
                      width={1000}
                      height={1}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Typography
                    fontWeight={400}
                    fontFamily="HankenGroteskRegular"
                    fontSize={{
                      lg: "16px",
                      md: "16px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    lineHeight={{
                      lg: "22.4px",
                      md: "22.4px",
                      sm: "19.6px",
                      xs: "19.6px",
                    }}
                    component="p"
                    color="rgba(32, 28, 26, 1)"
                    textAlign="center"
                  >
                    {eachdata.name}, {eachdata.position}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      {isMobile ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          marginTop="32px"
        >
          <Button
            id="Left Crow"
            aria-label="Left Crow"
            onClick={slidePrev}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "100%",
              height: "36px",
              width: "36px",
              minWidth: 0,
              padding: 0,
            }}
          >
            <ClickableArrowScholarship direction="left" />
          </Button>
          <Button
            id="Right crow"
            aria-label="Right crow"
            onClick={slideNext}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: "100%",
              height: "36px",
              width: "36px",
              minWidth: 0,
              padding: 0,
            }}
          >
            <ClickableArrowScholarship direction="right" />
          </Button>
        </Box>
      ) : null}
    </RootContainer>
  );
};

export default ScholarshipTestimonials;

{
  /* <Box display="flex" justifyContent="center" alignItems="center">
<Box
  // border="1px solid rgba(32, 28, 26, 0.55)"
  padding="24px"
  // height={{ lg: "420px", md: "480px", sm: "100%", xs: "100%" }}
  // width={{ lg: "322px", md: "322px", sm: "100%", xs: "100%" }}
  borderRadius="12px"
>
  <Box display="flex" flexDirection="column" gap="24px">
    <Box display="flex" gap="12px">
      <Box
        height="51px"
        width="51px"
        borderRadius="100%"
        overflow="hidden"
      >
        <Image
          alt="student"
          src={eachdata.img}
          width={1000}
          height={1}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px">
        <Typography
          component={"h5"}
          fontFamily="HankenGroteskSemiBold"
          fontSize="16px"
          lineHeight="20.8px"
          color="rgba(45, 45, 45, 1)"
        >
          {eachdata.name}
        </Typography>
        <Typography
          component={"p"}
          fontFamily="HankenGroteskSemiBold"
          fontSize="14px"
          lineHeight="20.8px"
          color="rgba(32, 28, 26, 0.55)"
        >
          {eachdata.position}
        </Typography>
      </Box>
    </Box>
    <Typography
      fontFamily="HankenGroteskRegular"
      fontSize="16px"
      component="p"
      lineHeight="20.8px"
      color="rgba(32, 28, 26, 0.9)"
    >
      "{eachdata.desc}"
    </Typography>
  </Box>
</Box>
</Box> */
}
