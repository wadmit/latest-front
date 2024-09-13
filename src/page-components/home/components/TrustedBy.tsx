import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { RootContainer } from "@/components/common";
import { Autoplay } from "swiper/modules";
import {
  universityImages,
  altTags,
} from "@/page-components/home/utils/provider";

function TrustedBy() {
  SwiperCore.use([Autoplay]);
  const ref = React.useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <RootContainer mt="40px">
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
          component={"h4"}
        >
          Trusted by 200+ universities
        </Typography>
      </Box>
      <Box
        width="100%"
        pb={{
          lg: "96px",
          md: "96px",
          sm: "80px",
          xs: "80px",
        }}
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
            background: "linear-gradient(to right, transparent, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, transparent, transparent)",
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
    </RootContainer>
  );
}

export default TrustedBy;
