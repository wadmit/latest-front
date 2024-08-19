import React from "react";
import { Divider, Typography, Box } from "@mui/material";
import Link from "next/link";
import type { TSimilarRcommendationProp } from "@/page-components/programs/utils/types";
import SimilarRecomCard from "@/components/common/program-university-components/SimilarRecomCard";

function SimilarRecommendation({
  type,
  recommendation,
}: TSimilarRcommendationProp) {
  return (
    <Box
      padding="32px 24px"
      borderRadius="12px"
      bgcolor="#FFF"
      border="1px solid #E9E9E9"
    >
      <Typography variant="h4">Similar {type}</Typography>
      <Divider />
      <Box display="flex" flexDirection="column">
        {recommendation && recommendation.length > 0 ? (
          recommendation.map((recom) => (
            <div key={recom.name}>
              <SimilarRecomCard type={type} recom={recom} />
              <Divider />
            </div>
          ))
        ) : (
          <Typography>No similar {type} found</Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt="23px">
        <Link href={`/${type}`}>
          <Typography
            sx={{
              cursor: "pointer",
            }}
            color="#FF6B26"
            fontFamily="HankenGroteskSemiBold"
            lineHeight="120%"
            fontSize="14px"
          >
            View all {type}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default SimilarRecommendation;
