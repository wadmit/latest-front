import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import type { IWhyChooseType } from "@/page-components/recruiting-partners/utils/types";
import ImageComponent from "@/components/common/image-component";
import Image from "next/image";

export function WhyChooseCard({
  data,
  title,
  src,
}: {
  data: IWhyChooseType[];
  title: string;
  src: string;
}) {
  return (
    <Box
      bgcolor="rgba(244, 244, 244, 1)"
      padding="24px"
      borderRadius="12px"
      width={{ lg: "381px", md: "381px", sm: "350px", xs: "320px" }}
      minHeight={{ lg: "381px", md: "381px", sm: "350px", xs: "320px" }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <ImageComponent
          alt="img-Homepage"
          style={{
            objectFit: "contain",
          }}
          src={src}
          height={45}
          width={45}
        />
      </Box>
      <Box mt="17px">
        <Typography
          component={"h1"}
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "24px", md: "24px", sm: "22px", xs: "20px" }}
          lineHeight="31.2px"
          letterSpacing="-2%"
          color="rgba(0, 0, 0, 1)"
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="20px" mt="20px">
        {data.map((item) => (
          <Stack
            direction="row"
            columnGap={1}
            // my={0.4}
            key={JSON.stringify(item.title)}
            alignItems="flex-start"
            component="li"
          >
            <Box mt={0.9}>
              <Image
                src="/images/common/tick-circle.webp"
                alt="tick image"
                width={20}
                height={20}
              />
            </Box>
            <Typography
              component={"p"}
              fontSize={{ lg: "16px", md: "16px", sm: "16px", xs: "14px" }}
              fontFamily="HankenGroteskRegular"
            >
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
