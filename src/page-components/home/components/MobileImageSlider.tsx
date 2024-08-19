import React from "react";
import Image from "next/image";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "@/styles/img-slider.module.css";
import { EffectCards, Navigation } from "swiper/modules";
import { Box } from "@mui/material";
import {
  readBlogMobileImages,
  readBlogMobileImagesAlts,
} from "@/page-components/home/utils/provider";

SwiperCore.use([Navigation]);

function MobileImageSlider() {
  return (
    <Swiper
      effect="cards"
      grabCursor
      initialSlide={2}
      mousewheel={{
        invert: false,
      }}
      modules={[EffectCards]}
      className={`${styles.swiper} mySwiper`}
      spaceBetween={0}
      slidesPerView={1}
    >
      <Box>
        {readBlogMobileImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              // height={0}
              // width={0}
              height={100}
              width={1000}
              alt={readBlogMobileImagesAlts[index]}
              //   layout="fill"
              style={{ height: "100%", width: "100%" }}
              loading="lazy"
              src={image}
            />
          </SwiperSlide>
        ))}
      </Box>
    </Swiper>
  );
}

export default MobileImageSlider;
