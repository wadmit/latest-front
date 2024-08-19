import React, { useContext } from "react";
import { Divider, Grid, Box, Typography } from "@mui/material";
import ProgramsDetailContext from "@/context/program-detail-context";

const PreRequties = React.forwardRef((props, ref) => {
  const programs = useContext(ProgramsDetailContext);
  return (
    <Box
      padding="32px 24px 32px 32px"
      borderRadius="12px"
      border="1px solid var(--Scrim-Overlay, #E9E9E9)"
      bgcolor="#ffffffff"
      ref={ref}
      id="pre_requisties"
    >
      <Typography
        fontSize="24px"
        fontFamily="HankenGroteskExtraBold"
        color="#201C1A"
      >
        Pre-requisites
      </Typography>
      <Grid container mt="24px" justifyContent="space-between">
        {/* Minimum Requirements */}
        <Grid item xs={12} md={6} sm={12} lg={5.5}>
          <Box padding="24px" bgcolor="#EAF3FF" borderRadius="8px">
            <Typography
              color="rgba(32, 28, 26, 0.95)"
              fontSize="18px"
              fontFamily="HankenGroteskSemiBold"
              fontStyle="normal"
            >
              Minimum Requirements
            </Typography>
            <Box
              mt="25px"
              mb="8px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flex={0.4}>
                <Typography
                  fontSize="16px"
                  fontFamily="HankenGroteskSemiBold"
                  color="#011938"
                >
                  Age
                </Typography>
              </Box>
              <Box flex={0.6}>
                <Typography fontSize="16px" fontFamily="HankenGroteskRegular">
                  {programs?.detail?.requirements?.age}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              mt="15px"
              mb="8px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="5px"
            >
              <Box flex={0.4}>
                <Typography
                  fontSize="16px"
                  fontFamily="HankenGroteskSemiBold"
                  color="#011938"
                >
                  Academic
                </Typography>
              </Box>
              <Box flex={0.6}>
                <Typography fontSize="16px" fontFamily="HankenGroteskRegular">
                  {programs?.detail?.requirements?.academic}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              mt="15px"
              mb="8px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="5px"
            >
              <Box flex={0.4}>
                <Typography
                  fontSize="16px"
                  fontFamily="HankenGroteskSemiBold"
                  color="#011938"
                >
                  Language
                </Typography>
              </Box>
              <Box flex={0.6}>
                <Typography fontSize="16px" fontFamily="HankenGroteskRegular">
                  {programs?.detail?.requirements?.language
                    ?.split("/")
                    .join(" , ") ?? "NA"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Application pre requisites */}
        <Grid item xs={12} md={6} sm={12} lg={5.5}>
          <Box padding="24px" borderRadius="8px">
            <Typography
              color="rgba(32, 28, 26, 0.95)"
              fontSize="18px"
              fontFamily="HankenGroteskSemiBold"
              fontStyle="normal"
            >
              Application Pre-requisites
            </Typography>
            <ul
              style={{
                listStyleType: "square",
                marginTop: "16px",
                paddingInlineStart: "20px",
              }}
            >
              {programs.detail.documents &&
                programs.detail.documents.map((document) => (
                  <li
                    key={document}
                    style={{
                      marginTop: "8px",
                    }}
                  >
                    {document}
                  </li>
                ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export default PreRequties;
