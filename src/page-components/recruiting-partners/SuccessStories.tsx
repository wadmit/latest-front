"use client";
import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import Image from "next/image";

import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { RootContainer } from "@/components/common";
import { SuccessStoriesData } from "@/page-components/recruiting-partners/utils/provider";
import { ClickableArrow } from "public/svg";

// Initialize Swiper core and add Navigation and Pagination modules
SwiperCore.use([Navigation, Pagination]);

function SuccessStories() {
  const swiperRef = useRef(null) as any;

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

  return (
    <RootContainer
      mt={{ lg: "6rem", md: "6rem", sm: "5rem", xs: "4rem" }}
      mb="6.25rem"
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", marginBottom: "36px" }}
      >
        What our partners have to say about us
      </Typography>

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
        spaceBetween={25}
        slidesPerView={3}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }} // Enable navigation arrows
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function (swiper, current, total) {
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
          290: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // 340: {
          //   slidesPerView: 1,
          // },
          700: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
      >
        {SuccessStoriesData.map((eachdata, index) => (
          <SwiperSlide key={index}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                border="1px solid rgba(32, 28, 26, 0.55)"
                padding="24px"
                height="240px"
                width={{ lg: "322px", md: "322px", sm: "250px", xs: "100%" }}
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
                        layout="responsive"
                        alt={eachdata.name}
                        src={eachdata.img}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" gap="4px">
                      <Typography
                        fontFamily="HankenGroteskSemiBold"
                        fontSize="16px"
                        lineHeight="20.8px"
                        color="rgba(45, 45, 45, 1)"
                      >
                        {eachdata.name}
                      </Typography>
                      <Typography
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

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="18px"
        marginTop="32px"
      >
        <Button
          onClick={slidePrev}
          style={{
            backgroundColor: "rgba(255, 107, 38, 1)",
            borderRadius: "100%",
            height: "32px",
            width: "32px",
            minWidth: 0,
            padding: 0,
          }}
        >
          <ClickableArrow direction="left" />
          </Button>
        <Button
          onClick={slideNext}
          style={{
            backgroundColor: "rgba(255, 107, 38, 1)",
            borderRadius: "100%",
            height: "32px",
            width: "32px",
            minWidth: 0,
            padding: 0,
          }}
        >
          <ClickableArrow direction="right" />
          </Button>
      </Box>
    </RootContainer>
  );
}

export default SuccessStories;
