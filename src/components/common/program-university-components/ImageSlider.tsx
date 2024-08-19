import React from "react";
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import applicationConfig from "@/config";
import Image from "next/image";

function ImageSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      spaceBetween={10}
      modules={[Navigation]}
      navigation
      slidesPerView={1}
    >
      {images && images.length > 0 ? (
        images.map((src) => (
          <SwiperSlide key={`${src}_img`}>
            <Image
              style={{
                width: "100%",
                minWidth: "258px",
                height: "194px",
                borderRadius: "8px",
              }}
              width={100000}
              height={1}
              src={`${applicationConfig.distributionKey}/${src}`}
              alt="Images and videos"
            />
          </SwiperSlide>
        ))
      ) : (
        <Typography>No Images Found</Typography>
      )}
    </Swiper>
  );
}

export default ImageSlider;
