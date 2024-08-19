"use client";

import { Box } from "@mui/material";

type Props = {
  handleGoBack: () => void;
};

const GoBackButton: React.FC<Props> = ({ handleGoBack }) => (
  <Box
    display={{ lg: "flex", md: "flex", sm: "flex", xs: "none" }}
    alignItems="center"
    justifyContent="center"
    onClick={handleGoBack}
    sx={{
      cursor: "pointer",
    }}
    bgcolor="#ffffff"
    component="button"
    minWidth="161px"
    width={{
      lg: "fit-content",
      md: "fit-content",
      sm: "fit-content",
      xs: "fit-content",
    }}
    // height="50px"
    border="1px solid #201C1A66"
    borderRadius="8px"
    padding="16px 42px"
    // fontSize="16px"
    mt={{ lg: "60px", md: "60px", sm: "30px", xs: "30px" }}
    fontFamily="HankenGroteskBold"
  >
    Go Back
  </Box>
);

export default GoBackButton;
