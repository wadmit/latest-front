"use client";
import { RootContainer } from "@/components/common";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function TitleComponent() {
  const router = useRouter();
  return (
    <RootContainer
      sx={{
        bgcolor: "#ffffff",
        pt: { lg: "120px", md: "124px", sm: "89px", xs: "89px" },
        mb: "70px",
      }}
    >
      <Stack
        sx={{
          textAlign: { lg: "center", md: "center", sm: "left", xs: "left" },
        }}
        width="100%"
      >
        <Typography
          component={"h2"}
          lineHeight={{
            lg: "36.4px",
            md: "36.4px",
            sm: "31.2px",
            xs: "31.2px",
          }}
          fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "22px" }}
          fontFamily="HankenGroteskExtraBold"
        >
          Stay ahead with our{" "}
          <Typography
            lineHeight={{
              lg: "36.4px",
              md: "36.4px",
              sm: "31.2px",
              xs: "31.2px",
            }}
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "22px" }}
            fontFamily="HankenGroteskExtraBold"
            color="rgba(170, 68, 1, 1)"
            borderBottom="6px dotted rgba(170, 68, 1, 1)"
          >
            AI platform
          </Typography>{" "}
          for your institution
        </Typography>
        <Box
          // mt={{lg:"35px",
          maxWidth="13.9375rem"
          alignSelf={{
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          }}
          width="100%"
        >
          <Button
            onClick={() => router.push("/joinus")}
            sx={{
              bgcolor: "rgba(255, 107, 38, 1)",
              width: "fit-content",
              minWidth: "187px",
              borderRadius: "8px",
              padding: "16.5px 46px",
              color: "white",
              mt: { lg: "30px", md: "43px", sm: "24px", xs: "24px" },
              textTransform: "none",
            }}
          >
            Partner with us
          </Button>
        </Box>
      </Stack>
    </RootContainer>
  );
}
export default TitleComponent;
