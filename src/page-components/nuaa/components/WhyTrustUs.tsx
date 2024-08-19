import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { trustUsData } from "@/page-components/nuaa/utils/provider";

type Props = {};

const WhyTrustUs = (props: Props) => {
  return (
    <Box textAlign="left">
      <Box mb="32px" display="flex" justifyContent="center" alignItems="center">
        <Typography
          fontSize="30px"
          fontStyle="normal"
          fontFamily="HankenGroteskExtraBold"
          lineHeight="150%"
          letterSpacing="-0.64px"
          color="#201C1A"
          variant="h3"
          textAlign="center"
        >
          Why trust us?
        </Typography>
      </Box>
      <Box display="flex" width="100%">
        <Grid
          width="100%"
          container
          flex={1}
          display="flex"
          flexWrap="wrap"
          // alignItems="center"
          justifyContent={{ lg: "space-between", md: "flex-start" }}
          spacing="10px"
          // overflow="hidden"
          flexDirection="row"
        >
          {trustUsData.map(({ text, icon }) => (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Box
                p={2}
                height={{ xs: "auto", sm: "auto", md: "auto" }}
                borderRadius="8px"
                // bgcolor="#F3EFEB"
                display="flex"
                flexDirection="column"
                gap="32px"
                minWidth="203px"
                border="1px solid #999999"
              >
                {icon}
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "15px", lg: "15px" }}
                  fontStyle="normal"
                  fontFamily="HankenGroteskRegular"
                  lineHeight="160%"
                >
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WhyTrustUs;
