import { Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import {
  readBlogImages,
  readBlogImagesAlts,
} from "@/page-components/home/utils/provider";

const LargeImage = () => {
  return (
    <>
      {readBlogImages.map((eachImage, index) => {
        return (
          <Grid key={index} item lg={6} md={4} sm={6}>
            <Image
              src={eachImage}
              loading="lazy"
              width="380"
              height="285"
              //   width="380px"
              //   height="285px"
              alt={readBlogImagesAlts[index]}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default LargeImage;
