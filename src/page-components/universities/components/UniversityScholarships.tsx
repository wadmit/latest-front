import React, { forwardRef } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Image from "next/image";

const UniversityScholarships = forwardRef(
  ({ scholarships }: { scholarships: string[] }, ref) => (
    <Box
      padding="32px 24px 32px 32px"
      borderRadius="12px"
      border="1px solid var(--Scrim-Overlay, #E9E9E9)"
      bgcolor="#ffffffff"
      ref={ref}
      id="scholarships"
    >
      <Typography
        fontSize="24px"
        fontFamily="HankenGroteskExtraBold"
        color="#201C1A"
      >
        Available Scholarships
      </Typography>
      <Grid mt="36px" rowGap="36px" container>
        {scholarships && scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <Grid
              key={`uni-link-${scholarship}`}
              item
              lg={6}
              xs={12}
              md={6}
              sm={12}
            >
              <Box display="flex" gap="12px" alignItems="center">
                <Image
                  src="/images/common/tick-circle.webp"
                  width={1000}
                  height={24}
                  style={{
                    width: 24,
                  }}
                  alt="tick icon"
                />
                <Typography>{scholarship}</Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography>No scholarships found</Typography>
        )}
      </Grid>
    </Box>
  )
);

export default UniversityScholarships;
