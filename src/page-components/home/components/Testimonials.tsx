import React, { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import styles from "@/styles/testimonial.module.css";
import { Navigation, Pagination } from "swiper/modules";
import ThumbnailWrapper from "@/page-components/home/components/atoms/ThumbnailWrapper";
import { RootContainer } from "@/components/common";
import {  ClickableArrow } from "public/svg";
import { testimonialsData } from "@/page-components/home/utils/provider";
import type { IThumbnailWrapperRef } from "@/page-components/home/utils/types";

SwiperCore.use([Navigation, Pagination]);

function Testimonials() {
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

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: IThumbnailWrapperRef | null }>({});

  const handlePlay = (name: string) => {
    if (
      playingVideo &&
      playingVideo !== name &&
      videoRefs.current[playingVideo]
    ) {
      videoRefs.current[playingVideo]?.pause();
    }
    setPlayingVideo(name);
  };
  const setRef = (name: string, ref: IThumbnailWrapperRef | null) => {
    videoRefs.current[name] = ref;
  };

  return (
    <RootContainer
      mt={{ lg: "6rem", md: "6rem", sm: "5rem", xs: "4rem" }}
      mb="6.25rem"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={{ lg: "48px", md: "48px", sm: "42px", xs: "28px" }}
      >
        <Typography
          fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "20px" }}
          fontFamily="HankenGroteskExtraBold"
          lineHeight={{ lg: "36.4px", md: "36.4px", sm: "32px", xs: "26px" }}
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
          textAlign="center"
          component="h2"
        >
          What our students say about us
        </Typography>
      </Box>

      <style />

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        className={styles.swiper_container}
        // preloadImages={false}
        ref={swiperRef}
        observer
        breakpoints={{
          0: {
            slidesPerView: 1,
            width: 253,
          },
          300: {
            slidesPerView: 1,
            width: 260,
          },
          600: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 2,
          },
          853: {
            slidesPerView: 2,
          },
          960: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 2,
          },
          1260: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {testimonialsData.map((item, index) => (
          // <Box gap="20px" display="flex">
          <SwiperSlide className={styles.swiper_slide} key={item.name}>
            <ThumbnailWrapper
              name={item.name}
              course={item.course}
              thumbnail={item.thumbnail}
              videoUrl={item.videoUrl}
              isPlaying={playingVideo === item.name}
              onPlay={() => handlePlay(item.name)}
              ref={(ref) => setRef(item.name, ref)}
            />
          </SwiperSlide>
          // </Box>
        ))}
      </Swiper>

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
            backgroundColor: "rgba(255, 107, 38, 1)",
            borderRadius: "100%",
            height: "36px",
            width: "36px",
            minWidth: 0,
            padding: 0,
          }}
        >
          <ClickableArrow direction="left" />
        </Button>
        <Button
          id="Right crow"
          aria-label="Right crow"
          onClick={slideNext}
          style={{
            backgroundColor: "rgba(255, 107, 38, 1)",
            borderRadius: "100%",
            height: "36px",
            width: "36px",
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

export default Testimonials;
