"use client";
import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import { RootContainer } from "@/components/common";
import { testimonialData } from "@/page-components/students/utils/provider";

// Initialize Swiper core and add Navigation and Pagination modules
SwiperCore.use([Navigation, Pagination]);

function Testimonial() {
  const swiperRef = useRef(null) as any;

  return (
    <RootContainer
      mt={{ lg: "6rem", md: "6rem", sm: "5rem", xs: "4rem" }}
      mb="6.25rem"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={{ lg: "48px", md: "48px", sm: "42px", xs: "38px" }}
      >
        <Typography
          fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "20px" }}
          fontFamily="HankenGroteskExtraBold"
          lineHeight={{ lg: "36.4px", md: "36.4px", sm: "32px", xs: "26px" }}
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
          textAlign="center"
        >
          What our students say about us
        </Typography>
      </Box>

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
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }} // Enable navigation arrows
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
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: -400,
          },
        }}
      >
        {testimonialData.map((eachdata, index) => (
          <SwiperSlide key={index}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                border="1px solid rgba(32, 28, 26, 0.55)"
                padding="24px"
                height={{ lg: "420px", md: "480px", sm: "100%", xs: "100%" }}
                width={{ lg: "322px", md: "322px", sm: "100%", xs: "100%" }}
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
                        {eachdata.position}, ({eachdata.partner})
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
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </RootContainer>
  );
}

export default Testimonial;
