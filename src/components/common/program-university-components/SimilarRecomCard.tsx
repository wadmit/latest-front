import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IRecommendation } from "@/types/utils";

function SimilarRecomCard({
  recom,
  type,
}: {
  recom: IRecommendation;
  type: "programs" | "universities";
}) {
  return (
    <Box gap="12px" mt="12px" display="flex" pb="12px" alignItems="center">
      <Box
        flex={0.2}
        display="flex"
        width="64px"
        height="78px"
        justifyContent="center"
        alignItems="center"
        borderRadius="4px"
        border="1px solid #E9E9E9"
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${recom.image_key}`}
          width={100000}
          height={1}
          alt={recom.name!}
        />
      </Box>
      <Box flex={0.8} display="flex" flexDirection="column">
        <Typography
          fontSize="16px"
          fontFamily="HankenGroteskSemiBold"
          fontStyle="normal"
          color="#201C1A"
          lineHeight="160%"
        >
          <Link href={`/${type}/${recom?.slug ?? ""}`}>{recom.name}</Link>
        </Typography>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontSize="14px"
          color="rgba(32, 28, 26, 0.55)"
        >
          {recom.subName}
        </Typography>
      </Box>
    </Box>
  );
}

export default SimilarRecomCard;
