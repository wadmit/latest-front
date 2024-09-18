"use client";
import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { galleryImages } from "@/page-components/institution/utils/provider";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const OurGallery = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="33px"
      mt={{ lg: "5px", md: "5px", sm: "1px", xs: "1px" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={{ lg: "100px", md: "100px", sm: "70px", xs: "70px" }}
      >
        <Typography
          component={"h2"}
          lineHeight="41.6px"
          fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
          fontFamily="HankenGroteskExtraBold"
        >
          Our{" "}
          <Typography
            lineHeight="41.6px"
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            fontFamily="HankenGroteskExtraBold"
            color="rgba(170, 68, 1, 1)"
            borderBottom="6px dotted rgba(170, 68, 1, 1)"
            display="inline"
          >
            gallery
          </Typography>{" "}
        </Typography>
      </Box>
      <Box>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000, //slide changes avery 3 seconds
            disableOnInteraction: false, //autoplay even after user interaction
          }}
          breakpoints={{
            //window >= 0px (xs size)
            0: {
              slidesPerView: 1.3,
              spaceBetween: 0,
            },
            //window >= 600px (sm size)
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            //window >= 960px (md size)
            960: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                style={{
                  width: "100%",
                  height: isMobile ? "240px" : "340px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default OurGallery;
