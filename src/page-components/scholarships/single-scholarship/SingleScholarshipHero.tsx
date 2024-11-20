"use client";
import applicationConfig from "@/config";
import { IScholarshipResponse } from "@/types/utils";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { WiseAdmitDefault } from "public/svg";
import SingleImg from "public/images/scholarships/singlecholarshipimg.png";
import React from "react";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";

type Props = {
  scholarship: IScholarshipResponse;
};

const SingleScholarshipHero = ({ scholarship }: Props) => {
  const imageUrl = applicationConfig.distributionKey;
  const router = useRouter();
  return (
    <Box
      position="relative"
      sx={{
        maxWidth: "100vw",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          maxWidth: "1510px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Box height={{ lg: "100%", md: "100%", sm: "290px", xs: "290px" }}>
          {scholarship.scholarship.scholarshipCoverImage ? (
            <Box height={{ lg: "472px", md: "450px", sm: "100%", xs: "100%" }}>
              <Image
                width={1000000}
                height={1}
                style={{
                  width: "100%",
                  // height: { lg: "472px", md: "450px", sm: "100%", xs: "100%" },
                  // height: "290px",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt={scholarship.name}
                src={`${imageUrl}/${scholarship.scholarship.scholarshipCoverImage}`}
                // src={SingleImg}
              />
            </Box>
          ) : (
            <Image
              width={1000000}
              height={1}
              style={{
                width: "100%",
                // height: { lg: "472px", md: "450px", sm: "100%", xs: "100%" },
                // height: "290px",
                height: "100%",
                objectFit: "cover",
              }}
              alt={scholarship.name}
              //   src={`${imageUrl}/${scholarship.scholarship.scholarshipCoverImage}`}
              src={SingleImg}
            />
          )}
        </Box>

        <Box
          position="absolute"
          bgcolor="rgba(255, 255, 255, 0.53)"
          display="flex"
          flexDirection="column"
          gap="16px"
          top={{ lg: "145px", md: "75px", sm: "45px", xs: "45px" }}
          left={{ lg: "140px", md: "140px", sm: "16px", xs: "10px" }}
          padding={{ lg: "36px 48px", md: "36px 48px", sm: "22px", xs: "22px" }}
          borderRadius="8px"
          sx={{
            backdropFilter: "blur(70.4000015258789px)",
          }}
        >
          <Typography
            fontFamily="HankenGroteskExtraBold"
            fontWeight={800}
            letterSpacing="-2%"
            color="rgba(32, 28, 26, 1)"
            fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
            lineHeight={{
              lg: "41.6px",
              md: "41.6px",
              sm: "31.2px",
              xs: "31.2px",
            }}
          >
            {scholarship.name}
          </Typography>

          <Button
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleSearch(searchValue);
            // }}
            type="submit"
            sx={{
              background: "#FF6B26",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "14.61px 56.8px",
              height: "48px",
              width: { lg: "185px", md: "185px", sm: "100%", xs: "100%" },
              // maxWidth: "100%",
            }}
            onClick={() => router.push("/applynow")}
          >
            Apply now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleScholarshipHero;
