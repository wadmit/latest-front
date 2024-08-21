import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";


const NuaaSectionOne = () => {
  SwiperCore.use([Autoplay, Pagination]);
  return (
    <Box bgcolor="grey.50">
      <Box
        style={{
          height: "31.25rem",
          width: "auto",
        }}
      >
        <Box position="relative" width="100%" height="31.25rem">
          <Image
            src='/images/universities/nuaa-banner.webp'
            alt='banner'
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NuaaSectionOne;
