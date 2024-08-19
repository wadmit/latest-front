import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import ImageSlider from "@/components/common/program-university-components/ImageSlider";

function ProgramUniImgVideos({ images }: { images: string[] }) {
  return (
    <Box
      border="1px solid #E9E9E9"
      padding="32px 24px"
      borderRadius="8px"
      bgcolor="#fff"
    >
      <Typography
        lineHeight="150%"
        fontSize="24px"
        fontFamily="HankenGroteskExtraBold"
      >
        Photos & Videos
      </Typography>
      <Divider />
      <Box
        width="100%"
        sx={{
          overflowx: "auto",
        }}
        display="flex"
        justifyContent="flex-start"
        gap="20px"
        p={1}
        mt="10px"
      >
        <ImageSlider images={images} />
      </Box>
    </Box>
  );
}

export default ProgramUniImgVideos;
