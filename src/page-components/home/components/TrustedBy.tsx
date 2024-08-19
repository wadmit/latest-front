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
              <SwiperSlide key={`_${index}`}>
                <Image
                  width={68}
                  height={68}
                  // width={isMobile ? '58px' : '68px'}
                  // height={isMobile ? '58px' : '68px'}
                  style={{ width: "68px", height: "68px", objectFit: "cover" }}
                  loading="lazy"
                  alt={altTags[index]}
                  src={image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default TrustedBy;
