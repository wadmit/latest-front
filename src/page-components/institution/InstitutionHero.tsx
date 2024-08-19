"use client";
import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";

function InstitutionHero() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box position="relative">
      <img
        loading="lazy"
        alt="Institution Hero Image"
        style={{
          aspectRatio: "4/3",
          objectFit: "cover",
        }}
        src="/images/institution/hero.png"
        width="100%"
        height={isMobile ? "200px" : "560px"}
      />
      <Box
        position="absolute"
        sx={{
          background:
            "linear-gradient(98.7deg, rgba(0, 0, 0, 0.584) 26.16 %, rgba(0, 0, 0, 0) 53.46 %)",
        }}
        zIndex={11}
        top={0}
        left={0}
        right={0}
        bottom={0}
      />
      <RootContainer>
        <Box
          top={{ md: "111px", lg: "111px", sm: "24px", xs: "24px" }}
          position={{
            lg: "absolute",
            md: "absolute",
            sm: "relative",
            xs: "relative",
          }}
          zIndex={1000}
          display="flex"
          flexDirection="column"
        >
          <Typography
            component={"h1"}
            fontFamily="HankenGroteskExtraBold"
            lineHeight={{
              lg: "57.4px",
              md: "57.4px",
              sm: "38.4px",
              xs: "38.4px",
            }}
            color={{
              lg: "white",
              md: "white",
              sm: "rgba(0, 0, 0, 0.9)",
              xs: "rgba(0, 0, 0, 0.9)",
            }}
            fontSize={{
              lg: "48px",
              md: "48px",
              sm: "32px",
              xs: "32px",
            }}
          >
            Scale up your <br />{" "}
            <Typography
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "57.4px",
                md: "57.4px",
                sm: "38.4px",
                xs: "38.4px",
              }}
              color="rgba(255, 243, 129, 1)"
              borderBottom="6px dotted rgba(255, 243, 129, 1)"
              fontSize={{
                lg: "48px",
                md: "48px",
                sm: "32px",
                xs: "32px",
              }}
            >
              Recruitment
            </Typography>
          </Typography>

          <Typography
            component={"p"}
            fontSize="16px"
            fontFamily="HankenGroteskRegular"
            color={{
              lg: "rgba(255, 255, 255, 0.9)",
              md: "rgba(255, 255, 255, 0.9)",
              sm: "rgba(0, 0, 0, 0.9)",
              xs: "rgba(0, 0, 0, 0.9)",
            }}
            mt="24px"
            // opacity={0.9}
            lineHeight="24px"
            width={{ lg: "398px", md: "398px", sm: "100%", xs: "100%" }}
          >
            Increase your institution’s global presence and get access to over
            thousands of international students with our all-in-one proprietary
            platform.
          </Typography>

          <Button
            onClick={() => router.push("/joinus")}
            sx={{
              bgcolor: "rgba(255, 107, 38, 1)",
              width: "fit-content",
              minWidth: "187px",
              borderRadius: "8px",
              padding: "16.5px 46px",
              mt: { lg: "43px", md: "43px", sm: "18px", xs: "18px" },
              color: "white",
              textTransform: "none",
            }}
          >
            Partner with us
          </Button>
        </Box>
      </RootContainer>
    </Box>
  );
}

export default InstitutionHero;
