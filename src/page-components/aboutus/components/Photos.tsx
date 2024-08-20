"use client";
import { Linkedin } from "$/svg";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const Photos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    {
      name: "Dr. Rupesh Regmi",
      position: "Co-Founder & CEO",
      imgSrc: "/images/about/rupesh.webp",
      linkedInUrl: "https://www.linkedin.com/in/r4regmi/",
    },
    {
      name: "Sudip Thapa",
      position: "Co-Founder & CTO",
      imgSrc: "/images/about/sudip.webp",
      linkedInUrl: "https://www.linkedin.com/in/sudipthapa/",
    },
    {
      name: "Pan Cuicui",
      position: "Co-Founder",
      imgSrc: "/images/about/cui.webp",
      linkedInUrl: "https://www.linkedin.com/company/wise-admit/mycompany/",
    },
    {
      name: "Gerald Ochieng Ndede",
      position: "Country Manager, Kenya",
      imgSrc: "/images/about/gerald.webp",
      linkedInUrl: "https://www.linkedin.com/in/gerald-ndede/",
    },
    {
      name: "Christian Ilunga",
      position: "Country Manager, DR Congo",
      imgSrc: "/images/about/christian.webp",
      linkedInUrl: "https://www.linkedin.com/in/dr-christian-ilunga-6553b79b/",
    },
    {
      name: "Rupak Thapa Magar",
      position: "Founding Engineer",
      imgSrc: "/images/about/rupak.webp",
      linkedInUrl: "https://www.linkedin.com/in/rupaak/",
    },
    {
      name: "Subham Mishra",
      position: "Founding Engineer",
      imgSrc: "/images/about/subham.webp",
      linkedInUrl: "https://www.linkedin.com/in/subham-mishra-664b88217/",
    },
    {
      name: "Celina Pokharel",
      position: "Product Designer",
      imgSrc: "/images/about/celina.webp",
      linkedInUrl: "https://www.linkedin.com/in/selina-pk/",
    },
    {
      name: "Jeevan Ale Magar",
      position: "QA Engineer",
      imgSrc: "/images/about/jeevan.webp",
      linkedInUrl: "https://www.linkedin.com/in/jeevan-ale-175220221/",
    },
    {
      name: "Sanju Dongol",
      position: "Growth Manager",
      imgSrc: "/images/about/sanju.webp",
      linkedInUrl: "https://www.linkedin.com/in/sanjudongol/",
    },
    {
      name: "Priyanshu Kharel",
      position: "Software Engineer",
      imgSrc: "/images/about/priyanshu.webp",
      linkedInUrl: "https://www.linkedin.com/in/priyanshu-kharel-22a09b23a/",
    },
    {
      name: "Ayush Niroula",
      position: "Software Engineer",
      imgSrc: "/images/about/ayush.webp",
      linkedInUrl: "https://www.linkedin.com/in/ayush-niroula-431a891a5/",
    },
    {
      name: "Ankit Chitrakar",
      position: "Graphics Designer",
      imgSrc: "/images/about/ankit.webp",
      linkedInUrl: "https://www.linkedin.com/in/ankit-chitrakar-b6b836259/",
    },
  ];

  const handleLinkedInClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Grid
      container
      spacing={{ lg: "48px", md: "48px", sm: "20px", xs: "16px" }}
    >
      {data.map((item, index) => (
        <Grid item lg={3} md={3} sm={4} xs={6} key={index}>
          <Box>
            <Box
              position="relative"
              mb="20px"
              onClick={
                isMobile
                  ? () => handleLinkedInClick(item.linkedInUrl)
                  : undefined
              }
            >
              <Box
                sx={{
                  height: isMobile ? "180px" : "280px",
                  width: isMobile ? "180px" : "280px",
                }}
              >
                <Image src={item.imgSrc} fill objectFit="cover" alt="photo" style={{borderRadius: "8px"}} />
              </Box>
              <Box
                position="absolute"
                zIndex={1111}
                bottom={{ lg: "20px", md: "20px", sm: "20px", xs: "10px" }}
                right={{ lg: "6px", md: "6px", sm: "6px", xs: "-2px" }}
              >
                <Button
                  sx={{
                    height: "24px",
                    width: "24px",
                    background: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                      // color: "orange"
                    },
                  }}
                  onClick={() => handleLinkedInClick(item.linkedInUrl)}
                >
                  <LinkedInButton isMobile={isMobile} />
                </Button>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
            <Typography
              fontWeight={800}
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              lineHeight={{
                lg: "26px",
                md: "26px",
                sm: "23.4px",
                xs: "23.4px",
              }}
              letterSpacing="-2%"
              color="rgba(32, 28, 26, 1)"
              sx={{ cursor: "pointer" }}
              onClick={() => handleLinkedInClick(item.linkedInUrl)}
              mb="4px"
            >
              {item.name}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
              lineHeight={{
                lg: "20.8px",
                md: "20.8px",
                sm: "18.2px",
                xs: "18.2px",
              }}
              color="rgba(0, 0, 0, 0.6)"
            >
              {item.position}
            </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

interface ILinkedInButton {
  isMobile: boolean;
}

function LinkedInButton({ isMobile }: ILinkedInButton) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Linkedin color={isHovered ? "#FF6B26" : "white"} />
      {/* {isHovered ? (
        <Image
          src="/images/about/linkedinhover.svg"
          height={isMobile ? 20 : 26}
          width={isMobile ? 20 : 26}
          alt="hoverlinkedin"
        />
      ) : (
        <Image
          src="/images/about/linkedin.svg"
          height={isMobile ? 20 : 26}
          width={isMobile ? 20 : 26}
          alt="linkedin"
        />
      )} */}
    </Box>
  );
}

export default Photos;
